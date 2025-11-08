import { test } from '../src/fixtures'
import { TodoBuilder } from "../src/helpers"
import { expect } from "@playwright/test";

let token;

test.describe("API challenge", () => {
  test.beforeAll(async ({ request }, testinfo) => {
    let response = await request.post(`${testinfo.project.use.apiURL}challenger`);
    const headers = response.headers();
    token = headers["x-challenger"];
  });

  test("02 Получить список заданий GET /challenges", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.challenges.getChallenges(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body.challenges.length).toBe(59);
  });

  test("03 Получить список todos  GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodos(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token)
    expect(result.body.todos.length).toBe(10);
  });

  test("04 Получить список todo not plural GET /todo", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todo.getTodoNotPlural(token, testinfo);

    expect(result.response.status()).toBe(404);
    expect(result.headers["x-challenger"]).toBe(token)
  });

  test("05 Получить информацию todos по ID GET /todos/{Id}", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosById(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("06 Получить информацию todos по несуществующему ID GET /todos/{Id}", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosByIdNegative(token, testinfo);
    
    expect(result.response.status()).toBe(404);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("07 Получить headers todos HEAD /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getHeadTodos(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("08 Создание POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosCreate()
        .generate();
    let result = await api.todos.createTodos(token, testinfo, todo);
    
    expect(result.response.status()).toBe(201);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body).toMatchObject(todo);
  });

  test("09 Получить информацию по todos со статусом Done GET /todos/{Id}", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosWithDoneStatus(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.body).toHaveProperty('todos');
    expect(Array.isArray(result.body.todos)).toBe(true);
  });

  test("10 Создание todo с параметром doneStatus содержащим недопустимое значение POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithIncorrectStatus()
        .generate();
    let result = await api.todos.createTodosWithIncorrectStatus(token, testinfo, todo);

    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });
  
  test("11 Создание todo с title > 50 символов POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithLongTitle()
        .generate();
    let result = await api.todos.createTodosWithLongTitle(token, testinfo, todo);

    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("12 Создание todo с description > 200 символов POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithLongDescription()
        .generate();
    let result = await api.todos.createTodosWithLongDescription(token, testinfo, todo);    

    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("13 Создание todo с максимальными значениями title и description POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithLongDescriptionAndTitle()
        .generate();
    let result = await api.todos.createTodosWithLongDescriptionAndTitle(token, testinfo, todo); 
    
    expect(result.response.status()).toBe(201);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.response.body.title).toBe(result.response.title);
    expect(result.response.body.description).toBe(result.response.description);
    expect(result.response.body.doneStatus).toBe(result.response.doneStatus);
  });


  test("14 Создание todo с превышением максимального количества символов в названии POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithUnsupportedTitle()
        .generate();
    let result = await api.todos.createTodosWithUnsupportedTitle(token, testinfo, todo);     
    
    expect(result.response.status()).toBe(413);
    expect(result.headers["x-challenger"]).toBe(token);
  });
  
  test("15 Создание todo с дополнительным параметром priority POST /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosWithExtraParam()
        .generate();
    let result = await api.todos.createTodosWithExtraParam(token, testinfo, todo);   

    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("16 Отредактировать несуществующее todo в системе PUT /todos/{id} ", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosId()
        .generate();
    let result = await api.todos.putTodosWithIncorrectId(token, testinfo, todo);   
    
    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });


  test("17 Обновление существующего todo POST /todos/{id}", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdPositive()
        .generate();
    let result = await api.todos.putTodosWithCorrectId(token, testinfo, todo);       
    
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.response.title).toBe(result.response.title);
    expect(result.response.description).toBe(result.response.description);
    expect(result.response.doneStatus).toBe(result.response.doneStatus);
  });

  test("18 Обновление несуществующего todo POST /todos/{id}", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosCreate()
        .generate();
    let result = await api.todos.postTodosWithIncorrectId(token, testinfo, todo);       
    

    expect(result.response.status()).toBe(404);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("19 Отредактировать существующее todo в системе полностью PUT /todos/{id} ", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdPositive()
        .generate();
    let result = await api.todos.putTodosFull(token, testinfo, todo);        
    
    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("20 Отредактировать существующее todo в системе частично PUT /todos/{id} ", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdPartial()
        .generate();
    let result = await api.todos.putTodosPartial(token, testinfo, todo);      

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("21 Отредактировать существующее todo в системе без параметра title PUT /todos/{id} ", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosIdNoTitle()
        .generate();
    let result = await api.todos.putTodosWithoutId(token, testinfo, todo);     

    expect(result.response.status()).toBe(400);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("22 Отредактировать существующее todo в системе PUT /todos/{id} ", { tag: '@API'}, async ({ api }, testinfo) => {
    const todo = new TodoBuilder()
        .todosId()
        .generate();
    let result = await api.todos.putTodosById(token, testinfo, todo);       

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });


  test("23 Удаление существующущего todo в системе DELETE /todos/{id}", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.deleteTodosById(token, testinfo);     

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });


  test("24 Проверка доступных типов методов API /todos ", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.optionsTodos(token, testinfo);    

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("25 Получить список todos в XML формате GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosXML(token, testinfo); 

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers['content-type']).toContain('xml');
  });

  test("26 Получить список todos с JSON форматом GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosJSON(token, testinfo); 

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers['content-type']).toContain('json');
  });

  test("27 Получить список todos с Any форматом GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosJSON(token, testinfo); 

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers['content-type']).toContain('json');
  });

  test("28 Получить список todos с XML pref форматом GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosAny(token, testinfo); 

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
  });

  test("29 Получить список todos без Accept Header GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosWithoutAcceptHeader(token, testinfo);

    expect(result.response.status()).toBe(200);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers['content-type']).toContain('json');
  });

  test("30 Получить список todos с неподдерживаемым Accept Header GET /todos", { tag: '@API'}, async ({ api }, testinfo) => {
    let result = await api.todos.getTodosWithNotAcceptHeader(token, testinfo);

    expect(result.response.status()).toBe(406);
    expect(result.headers["x-challenger"]).toBe(token);
    expect(result.headers['content-type']).toContain('json');
  });
});