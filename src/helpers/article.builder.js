import { faker } from '@faker-js/faker';


export class ArticleBuilder {
    addTitle() {
        this.title = faker.internet.displayName();
        return this;
    }
    
    addDescription() {
        this.description = faker.book.title();
        return this;
    }

    addBody() {
        this.body = faker.book.format();
        return this;
    }

    addTags() {
        this.tags = faker.internet.displayName();
        return this;
    }
    
    generate() {
        return { ...this };
    }
}

export class CommentBuilder {
    addText() {
        this.text = faker.person.fullName();
        return this;
    }
    generate() {
        return { ...this };
    }
}