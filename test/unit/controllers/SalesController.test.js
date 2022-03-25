const sinon = require("sinon");
const { expect } = require("chai");

const SalesService = require('../../../services/SalesService');
const SalesController = require('../../../controllers/SalesController');

const getAllResponse = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  }
];

const createBody = [
    {
      productId: 1,
      quantity: 3
    }
];

const createResponse =   {
  id: 1,
  itemsSold: [
    {
      productId: 1,
      quantity: 3
    }
  ]
};

const updateResponse =   {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 3
    }
  ]
};

 
describe("SalesController: método GET", () => {
  const req = {};
  const res = {};

  describe("getAll: Não havendo produtos: Retorna uma mensagem de erro com o status 200", () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(SalesService, 'getAll').resolves(null)
    });
    after(() => {
      SalesService.getAll.restore();
    });
    
    it('responde a requisição com o status 200', async () => {
      await SalesController.getAll(req, res);
      
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it('responde a requisição com uma mensagem', async () => {
      await SalesController.getAll(req, res);
    
      expect(res.json.calledWith({ message: 'Não existem produtos cadastrados' })).to.be.equal(true);
    })
  });
  
  describe("getAll: Havendo produtos: Lista os produtos", () => {
    const req = {};
    const res = {};
    const next = () => '';

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, "getAll").resolves(getAllResponse);
    });

    after(() => {
      SalesService.getAll.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await SalesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it("o retorno um array de objetos", async () => {
      await SalesController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it("retorna um array com objetos", async () => {
      await SalesController.getAll(req, res);
      expect(res.json.calledWith(getAllResponse)).to.be.equal(true);
    });
  });

  describe("getById: Lista um produto cujo Id foi informado", () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    afterEach(() => {
      SalesService.getById.restore();
    });

    it('erro do servidor', async () => {
      sinon.stub(SalesService, "getById").resolves(getAllResponse);
      await SalesController.getById(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });

    it("Id válido: é retornado os dados solicitados com o status 200", async () => {
      req.params = 1;
      sinon.stub(SalesService, "getById").resolves(getAllResponse);

      await SalesController.getById(req, res);
      
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it("Id inválido: é retornado uma mensagem de erro com o status 404", async () => {
      req.params = 18193;
      sinon.stub(SalesService, "getById").resolves(false);

      await SalesController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({message: 'Sale not found' })).to.be.equal(true);
    });
  });
});

describe("SalesController: método POST", () => {
  const req = {};
  const res = {};
  describe("quando ocorre um erro", () => {
    beforeEach(() => {
      req.body = createBody;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(SalesService, 'create').throwsException()
    });
    afterEach(() => {
      SalesService.create.restore();

    })
    
    it('erro do servidor', async () => {    
      await SalesController.create(req, res);

      expect(res.status.calledWith(500)).to.be.equal(true);
    })
  });
  
  describe("Dados do body corretos:", () => {
    before(() => {
      req.body = createBody;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, "create").resolves(createResponse);
    });

    after(() => {
      SalesService.create.restore();
    });

    it("é retornado uma resposta com o status 201", async () => {
      await SalesController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it("o retorno é um objeto", async () => {
      await SalesController.create(req, res);

      const param = res.json.firstCall.firstArg;
      expect(param).to.be.a('object');
    });
  });
});

describe("SalesController: método PUT", () => {
  const req = {};
  const res = {};
  
  describe("Em caso de erro:", () => {
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(SalesService, 'update').resolves(null)
    });
    after(() => {
      SalesService.update.restore();
    })
    
    it('erro do servidor', async () => {
      await SalesController.update(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
  });
  
  describe("Dados do body corretos:", () => {
    before(() => {
      req.body = createBody;
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, "update").resolves(updateResponse);
    });

    after(() => {
      SalesService.update.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await SalesController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("o retorno é um array de objetos", async () => {
      await SalesController.update(req, res);

      expect(res.json.calledWith(updateResponse)).to.be.equal(true);
    });
  });
});


//  -----------------------> Não implementados - TDD de vdd

describe("SalesController: método DELETE", () => {
  const req = {};
  const res = {};
  describe("Em caso de erro:", () => {
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(SalesService, 'exclude').resolves(null)
    });
    after(() => {
      SalesService.exclude.restore();
    })
    
    it('erro do servidor', async () => {
      await SalesController.exclude(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
    it('id não existente', async () => {
      req.params = 999;
      await SalesController.exclude(req, res);
    
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.equal(true);
    });
  });
  
  describe("Deleção bem sucedida", () => {
    before(() => {
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(SalesService, 'exclude').resolves(true);
    });

    after(() => {
      SalesService.exclude.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await SalesController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
});
