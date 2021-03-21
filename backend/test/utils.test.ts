import { renameCategory, renameInventory } from '../src/utils/dataChanges';

describe('Utils', () => {
  test('Should return 1 + 1 = 2', () => {
    expect(1 + 1).toEqual(2);
  });

  test('Should correctly rename a category', () => {
    expect(renameCategory({
      id_categoria: 1,
      nombre_categoria: 'test',
      icon: 'icon',
      estado: 1,
      descripcion_categoria: 'desc',
    })).toEqual({
      categoryId: 1,
      name: 'test',
      icon: 'icon',
      active: 1,
      description: 'desc',
    });
  });

  test('Should properly rename the inventory', () => {
    expect(renameInventory({
      cantidad: 5,
      fk_id_producto: 1,
      fk_id_sucursal: 3,
    })).toEqual({
      quantity: 5,
      idProduct: 1,
      idOffice: 3,
    });
  });
});
