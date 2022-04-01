const app =  require("../app");
const request = require('supertest')

//const redisHelper = require("./../database/config-redis");
 
describe("Test from shopping car", () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("List products in the shopping car", async() => {       
        const resp = await request(app).get('/api/v1/shopping')
        expect(resp.status).toEqual(200);
  
    });

    test("Create a shopping car", async() => {
        const data = {
            "code": "1",
            "totalPrice": 0,
            "products": []
        }

        const resp = await request(app).post('/api/v1/shopping')
            .send(data)
        expect(resp.status).toEqual(201);
    });

    test("Insert product in the shopping car", async() => {
        const data = {
            "productId": "623e3971d9ae48401e5cedc4",
            "quantity": 1
        }

        const resp = await request(app).patch('/api/v1/shopping')
            .send(data)
        expect(resp.status).toEqual(200);
    });

    test("Delee product in the shopping car", async() => {
        const data = {
            "productId": "623e3971d9ae48401e5cedc4",
        }

        const resp = await request(app).delete('/api/v1/shopping')
            .send(data)
        expect(resp.status).toEqual(200);
    });

    test("Error, create an existing product", async() => {
        
        const data = {
            "code": "1",
            "name": "Best Protein Vainilla",
            "price": "170000",
            "category": "FOOD"
        }
            
        const resp = await request(app).post('/api/v1/products')
            .send(data)
        expect(resp.status).toEqual(400);
  
    });

    test("Edit a product", async() => {
        
        const data = {
            "code": "1",
            "name": "Best Protein Vainilla",
        }
            
        const resp = await request(app).patch('/api/v1/products')
            .send(data)
        expect(resp.status).toEqual(200);
  
    });

    test("Error, no exist edit a product", async() => {
        
        const data = {
            "code": "10000",
            "name": "Best Protein Vainilla",
        }
            
        const resp = await request(app).patch('/api/v1/products')
            .send(data)
        expect(resp.status).toEqual(400);
  
    });

    test("Error, no exist edit a product, category not allowed", async() => {
        
        const data = {
            "code": "1",
            "category": "no exist category",
        }
            
        const resp = await request(app).patch('/api/v1/products')
            .send(data)
        expect(resp.status).toEqual(400);
  
    });

    test("List a product", async() => {
            
        const resp = await request(app).get('/api/v1/products')
            .send({
                query : "{ products { code name } }",
            })
            .set("Accept", "application/json")
        expect(resp.status).toEqual(200);
  
    });
});
  
  
  