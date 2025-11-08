import { faker } from '@faker-js/faker';

export class UserBuilder {
    addEmail() {
        this.email = faker.internet.email();
        return this;
    }
    
    addName() {
        this.name = faker.person.fullName();
        return this;
    }
    
    addPassword() {
        this.password = faker.internet.password();
        return this;
    }
    
    generate() {
        return { ...this };
    }
}

export class UserSettingsBuilder {
    addEmail() {
        this.email = faker.internet.email();
        return this;
    }
    
    addName() {
        this.name = faker.person.fullName();
        return this;
    }
    
    addPassword() {
        this.password = faker.internet.password();
        return this;
    }
    
    addBio() {
        this.bio = faker.person.bio();
        return this;
    }

    addImageLink() {
        this.imageLink = faker.image.urlPicsumPhotos();
        return this;
    }
    
    generate() {
        return { ...this };
    }
}