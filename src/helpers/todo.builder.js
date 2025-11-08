import { faker } from '@faker-js/faker';

export class TodoBuilder {
    todosCreate() {
        this.title = faker.string.alpha({ length: 2 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosWithIncorrectStatus() {
        this.title = faker.string.alpha({ length: 3 });
        this.doneStatus = "abcd";
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosWithLongTitle() {
        this.title = faker.string.alpha({ length: 51 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5 });
        return this;
    }

    todosWithLongDescription() {
        this.title = faker.string.alpha({ length: 50 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 201 });
        return this;
    }

    todosWithLongDescriptionAndTitle() {
        this.title = faker.string.alpha({ length: 50 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 200 });
        return this;
    }

    todosWithUnsupportedTitle() {
        this.title = faker.string.alpha({ length: 50 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 5001 });
        return this;
    }

    todosWithExtraParam() {
        this.title = faker.string.alpha({ length: 7 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 15 });
        this.priority = "extra";
        return this;
    }

    todosId() {
        this.title = faker.string.alpha({ length: 8 });
        this.doneStatus = faker.datatype.boolean();
        this.description = faker.string.alpha({ length: 15 });
        return this;
    }

    todosIdPositive() {
        this.title = faker.string.alpha({ length: 8 });
        return this;
    }
    
    todosIdPartial() {
        this.title = faker.string.alpha({ length: 6 });
        return this;
    }

    todosIdNoTitle() {
        this.description = faker.string.alpha({ length: 15 });
        return this;
    }

    generate() {
        return { ...this };
    }
}