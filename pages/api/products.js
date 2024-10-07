import { Client, Environment } from 'square';

const client = new Client({
  accessToken: 'EAAAl3zj6PHCFW_9XypQqB5ppcknkH6AWms56CFZMlvTll-Fg92KFj-O_6HkbZFu',
  environment: Environment.Production,
});

function convertBigIntToString(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

export default async function handler(req, res) {
  try {
    console.log('Fetching all catalog items from Square...');

    const response = await client.catalogApi.listCatalog(undefined, 'ITEM');
    const convertedResponse = convertBigIntToString(response);

    if (!convertedResponse.result || !convertedResponse.result.objects) {
      console.error('Unexpected response format:', convertedResponse);
      return res.status(500).json({ error: 'Unexpected response format from Square API' });
    }

    const allItems = convertedResponse.result.objects.filter(item => item.type === 'ITEM');
    console.log(`Total number of ITEM objects: ${allItems.length}`);

    const formattedProducts = await Promise.all(allItems.map(async (item) => {
      console.log(`Processing item: ${item.id} - ${item.itemData.name}`);

      const variations = await Promise.all((item.itemData.variations || []).map(async (variation) => {
        let stockQuantity = 0;
        try {
          const inventoryResponse = await client.inventoryApi.retrieveInventoryCount(
            variation.id,
            undefined,
            undefined,
            'NONE'
          );
          const inventoryCount = convertBigIntToString(inventoryResponse);
          stockQuantity = inventoryCount.counts[0]?.quantity ? parseInt(inventoryCount.counts[0].quantity) : 0;
        } catch (error) {
          console.error(`Error fetching inventory for variation ${variation.id}:`, error);
        }

        return {
          id: variation.id,
          name: variation.itemVariationData.name,
          price: variation.itemVariationData.priceMoney ?
            `$${(variation.itemVariationData.priceMoney.amount / 100).toFixed(2)}` : 'N/A',
          stock: stockQuantity
        };
      }));

      let imageUrl = null;
      if (item.itemData.imageIds && item.itemData.imageIds.length > 0) {
        try {
          const imageResponse = await client.catalogApi.retrieveCatalogObject(item.itemData.imageIds[0]);
          imageUrl = imageResponse.result.object.imageData.url;
        } catch (error) {
          console.error(`Error fetching image for item ${item.id}:`, error);
        }
      }

      return {
        id: item.id,
        name: item.itemData.name,
        description: item.itemData.description || '',
        image_url: imageUrl,
        variations: variations,
        is_deleted: item.isDeleted || false,
        available_for_sale: item.itemData.availableForSale !== false,
        present_at_all_locations: item.presentAtAllLocations !== false
      };
    }));

    console.log('Formatted products:', JSON.stringify(formattedProducts, null, 2));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products', details: error.message });
  }
}