import { test } from '@playwright/test';

export class ToDosService {
  constructor(request) {
    this.request = request;
  }

  async getTodos(token, testinfo) {
    return test.step("03 Получить список todos  GET /todos", async () => {
      const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: {
        "x-challenger": token,
      },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosById(token, testinfo) {
    return test.step("05 Получить информацию todos по ID GET /todos/{Id}", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos/5`, {
        headers: {
        "x-challenger": token,
      },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosByIdNegative(token, testinfo) {
    return test.step("06 Получить информацию todos по несуществующему ID GET /todos/{Id}", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos/15`, {
        headers: { 'X-CHALLENGER': token },
      });
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getHeadTodos(token, testinfo) {
    return test.step("07 Получить headers todos HEAD /todos", async () => {
    const response = await this.request.head(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
      });
    const headers = response.headers();
    return { headers, response };
    });
  }

  async createTodos(token, testinfo, data) {
    return test.step("08 Создание POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data 
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosWithDoneStatus(token, testinfo) {
    return test.step("09 Получить информацию по todos со статусом Done GET /todos/{Id}", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        params: { 'doneStatus': true}
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithIncorrectStatus(token, testinfo, data) {
    return test.step("10 Создание todo с параметром doneStatus содержащим недопустимое значение POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithLongTitle(token, testinfo, data) {
    return test.step("11 Создание todo с title > 50 символов POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithLongDescription(token, testinfo, data) {
    return test.step("12 Создание todo с description > 200 символов POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithLongDescriptionAndTitle(token, testinfo, data) {
    return test.step("13 Создание todo с максимальными значениями title и description POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithUnsupportedTitle(token, testinfo, data) {
    return test.step("14 Создание todo с превышением максимального количества символов в названии POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async createTodosWithExtraParam(token, testinfo, data) {
    return test.step("15 Создание todo с дополнительным параметром priority POST /todos", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosWithIncorrectId(token, testinfo, data) {
    return test.step("16 Отредактировать несуществующее todo в системе PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/15676`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosWithCorrectId(token, testinfo, data) {
    return test.step("17 Обновление существующего todo POST /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async postTodosWithIncorrectId(token, testinfo, data) {
    return test.step("18 Обновление несуществующего todo POST /todos/{id}", async () => {
    const response = await this.request.post(`${testinfo.project.use.apiURL}todos/989`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosFull(token, testinfo, data) {
    return test.step("19 Отредактировать существующее todo в системе полностью PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosPartial(token, testinfo, data) {
    return test.step("20 Отредактировать существующее todo в системе частично PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosWithoutId(token, testinfo, data) {
    return test.step("21 Отредактировать существующее todo в системе без параметра title PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async putTodosById(token, testinfo, data) {
    return test.step("22 Отредактировать существующее todo в системе PUT /todos/{id}", async () => {
    const response = await this.request.put(`${testinfo.project.use.apiURL}todos/5`, {
        headers: { 'X-CHALLENGER': token },
        data: data
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async deleteTodosById(token, testinfo) {
    return test.step("23 Удаление существующущего todo в системе DELETE /todos/{id}", async () => {
    const response = await this.request.delete(`${testinfo.project.use.apiURL}todos/3`, {
        headers: { 'X-CHALLENGER': token }
      });
      
    const headers = response.headers();
    return { headers, response };
    });
  }  

  async optionsTodos(token, testinfo) {
    return test.step("24 Проверка доступных типов методов API /todos", async () => {
    const response = await this.request.fetch(`${testinfo.project.use.apiURL}todos`, {
        headers: { 'X-CHALLENGER': token }
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosXML(token, testinfo) {
    return test.step("25 Получить список todos в XML формате GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            "Accept": "application/xml", 
        }
      });
      
    const headers = response.headers();
    return { headers, response };
    });
  }

  async getTodosJSON(token, testinfo) {
    return test.step("26 Получить список todos с JSON форматом GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            "Accept": "application/json", 
        }
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosAny(token, testinfo) {
    return test.step("27 Получить список todos с Any форматом GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            "Accept": "*/*", 
        }
      });
      
    const headers = response.headers();
    return { headers, response };
    });
  }

  async getTodosXMLPref(token, testinfo) {
    return test.step("28 Получить список todos с XML pref форматом GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token, 
            "Accept": "application/xml, application/json", 
        }
      });
      
    const body = await response.json();
    const headers = response.headers();
    return { body, headers, response };
    });
  }

  async getTodosWithoutAcceptHeader(token, testinfo) {
    return test.step("29 Получить список todos без Accept Header GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token 
        }
      });
      
    const headers = response.headers();
    return { headers, response };
    });
  }

  async getTodosWithNotAcceptHeader(token, testinfo) {
    return test.step("30 Получить список todos с неподдерживаемым Accept Header GET /todos", async () => {
    const response = await this.request.get(`${testinfo.project.use.apiURL}todos`, {
        headers: { 
            'X-CHALLENGER': token,
            "Accept": "application/gzip"
        }
      });
      
    const headers = response.headers();
    return { headers, response };
    });
  }
}