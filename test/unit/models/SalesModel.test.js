const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SalesModel');

describe('SalesModel: método GET', function () {
  const payloadSale = [{
     saleId: 1,
     productId: 1,
     quantity: 5,
     date: '2022-03-05T17:12:30.000Z',
  }];

  const exec = [[{
    sale_id: 1,
    product_id: 1,
    quantity: 5,
    date: '2022-03-05T17:12:30.000Z',
 }]];

      before(async function () {
        sinon.stub(connection, 'execute').resolves(exec);
      });

      after(async function () {
        connection.execute.restore();
      });

   describe('getAll:', function () {
    it('retorna um array', async function () {
      const response = await SalesModel.getAll();

      expect(response).to.be.a('array');
    });
   });

   describe('getById:', function () {
    it('retorna um array', async function () {
      const response = await SalesModel.getById(1);

      expect(response).to.be.a('array');
    });
   });
});

// describe('SalesModel: método POST', () => {

//   const payloadSale = [{
//      saleId: 1,
//      productId: 1,
//      quantity: 5,
//      date: '2022-03-05T17:12:30.000Z'
//   }];

//   const exec = [[{
//     sale_id: 1,
//     product_id: 1,
//     quantity: 5,
//     date: '2022-03-05T17:12:30.000Z'
//  }]];

//       before(async () => {
//         sinon.stub(connection, 'execute').resolves(exec);
//       });

//       after(async () => {
//         connection.execute.restore();
//       });

//    describe('createSaleId:', () => {

//     it('retorna', async () => {

//       const response = await SalesModel.getAll();

//       expect(response).to.be.a('array');
//     });
//    });
// });