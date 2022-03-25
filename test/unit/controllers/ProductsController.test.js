const sinon = require("sinon");
const { expect } = require("chai");

const ProductsService = require('../../../services/ProductsService');
const ProductsController = require('../../../controllers/ProductsController');

const result = [
	{
		id: 1,
		name: "Martelo de Thor",
		quantity: 10
	}
];

const resultGetByID = 
	{
		id: 1,
		name: "Martelo de Thor",
		quantity: 10
	};

describe("ProductsController: método GET", () => {
  let req = {}, res = {};

  describe("getAll: Não havendo produtos: Retorna uma mensagem de erro com o status 200", () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'getAll').resolves(null)
    });
    after(() => {
      ProductsService.getAll.restore();
    });
    
    it('responde a requisição com o status 200', async () => {
      await ProductsController.getAll(req, res);
      
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
    it('responde a requisição com uma mensagem', async () => {
      await ProductsController.getAll(req, res);
    
      expect(res.json.calledWith({ message: 'Não existem produtos cadastrados' })).to.be.equal(true);
    })
  });
  
  describe("Havendo produtos: Lista os produtos", () => {
    const req = {};
    const res = {};

    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, "getAll").resolves(result);
    });

    after(() => {
      ProductsService.getAll.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await ProductsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it("o retorno um array de objetos", async () => {
      await ProductsController.getAll(req, res);

      expect(res.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
    it("retorna um array com objetos", async () => {
      await ProductsController.getAll(req, res);
      expect(res.json.calledWith(result)).to.be.equal(true);
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
      ProductsService.getById.restore();
    });

    it('erro do servidor', async () => {
      sinon.stub(ProductsService, "getById").resolves(resultGetByID);
      await ProductsController.getById(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });


    it("Id válido: é retornado os dados solicitados com o status 200", async () => {
      req.params = 1;
      sinon.stub(ProductsService, "getById").resolves(resultGetByID);

      await ProductsController.getById(req, res);
      
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
    it("Id inválido: é retornado uma mensagem de erro com o status 404", async () => {
      req.params = 18193;
      sinon.stub(ProductsService, "getById").resolves(false);

      await ProductsController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({message: 'Product not found' })).to.be.equal(true);
    });
  });
});

describe("ProductsController: método POST", () => {
  const req = {};
  const res = {};
  const next = () => '';
  describe("quando ocorre um erro", () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'create').resolves(null)
    });
    after(() => {
      ProductsService.create.restore();

    })
    
    it('next é chamado para lidar com o erro', async () => {
      await ProductsController.create(req, res, next);
    
      expect(next).to.exist;
    })
  });
  
  describe("Dados do body corretos:", () => {
    before(() => {
      req.body = { name: 'coke coisa', quantity: 123 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, "create").resolves(result);
    });

    after(() => {
      ProductsService.create.restore();
    });

    it("é retornado uma resposta com o status 201", async () => {
      await ProductsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });

    it("o retorno é um objeto", async () => {
      await ProductsController.create(req, res);

      const param = res.json.firstCall.firstArg;

      expect(param[0]).to.be.a('object');
    });
  });
});


describe("ProductsController: método PUT", () => {
  const req = {};
  const res = {};
  describe("Em caso de erro:", () => {
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'update').resolves(null)
    });
    after(() => {
      ProductsService.update.restore();
    })
    
    it('erro do servidor', async () => {
      await ProductsController.update(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
    it('id não existente', async () => {
      req.params = 999;
      await ProductsController.update(req, res);
    
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  
  describe("Dados do body corretos:", () => {
    before(() => {
      req.body = { name: 'coke coisa', quantity: 123 };
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, "update").resolves(result);
    });

    after(() => {
      ProductsService.update.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await ProductsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it("o retorno é um objeto", async () => {
      await ProductsController.update(req, res);

      const param = res.json.firstCall.firstArg;

      expect(param[0]).to.be.a('object');
    });
  });
});

describe("ProductsController: método DELETE", () => {
  const req = {};
  const res = {};
  describe("Em caso de erro:", () => {
    before(() => {
      req.body = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(ProductsService, 'exclude').resolves(null)
    });
    after(() => {
      ProductsService.exclude.restore();
    })
    
    it('erro do servidor', async () => {
      await ProductsController.exclude(req, res);
    
      expect(res.status.calledWith(500)).to.be.equal(true);
    });
    it('id não existente', async () => {
      req.params = 999;
      await ProductsController.exclude(req, res);
    
      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
  
  describe("Dados do body corretos:", () => {
    before(() => {
      req.body = { name: 'coke coisa', quantity: 123 };
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(ProductsService, 'exclude').resolves(result);
    });

    after(() => {
      ProductsService.exclude.restore();
    });

    it("é retornado uma resposta com o status 200", async () => {
      await ProductsController.exclude(req, res);

      expect(res.status.calledWith(204)).to.be.equal(true);
    });
  });
});
