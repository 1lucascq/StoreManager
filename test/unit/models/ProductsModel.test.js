const sinon = require("sinon");
const { expect } = require("chai");

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/ProductsModel');

describe('ProductsModel: método GET', () => {
  const exec = [[{
     id: 1,
     name: 'Ói de Tandera',
     quantity: 10,
  }]];

  afterEach(async () => {
    connection.execute.restore();
  });


  describe('getAll:', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(exec);
    });

    it('retorna um array de objetos', async () => {

      const response = await ProductsModel.getAll();

      expect(response).to.be.a('array');
      expect(response[0]).to.be.a('object');
    });
   });

  describe('getById:', () => {
  before(async () => {
    sinon.stub(connection, 'execute').resolves(exec);
  });
    it('retorna um objeto', async () => {

      const response = await ProductsModel.getById();

      expect(response).to.be.a('object');
    });
  });
});

describe('ProductsModel: método POST', () => {
  const exec = [{ insertId: 5 }];
  const result = {
    id: 5,
    name: 'Oi de Tandera',
    quantity: 1
  }
  afterEach(async () => {
    connection.execute.restore();
  });

  describe('create:', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(exec);
    });

    it('cria um objeto e o retorna com os dados enviados', async () => {
      
      const response = await ProductsModel.create({ name: 'Oi de Tandera', quantity: 1 });

      expect(response.id).to.be.equal(5);
      expect(response.name).to.be.equal('Oi de Tandera');
      expect(response.quantity).to.be.equal(1);
    });
   });
});

describe('ProductsModel: método PUT', () => {
  const updatedObj = {
    id: 5,
    name: 'Oi de Tandera',
    quantity: 1
  }
  afterEach(async () => {
    connection.execute.restore();
  });

  describe('update:', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves();
    });

    it('cria um objeto e o retorna com os dados enviados', async () => {
      
      const response = await ProductsModel.update(updatedObj);

      expect(response.id).to.be.equal(5);
      expect(response.name).to.be.equal('Oi de Tandera');
      expect(response.quantity).to.be.equal(1);
    });
   });
});