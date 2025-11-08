import { test as base, expect as baseExpect } from '@playwright/test';
import { App } from "../pages/app.page";
import { Api } from "../services/api.service";
import { UserBuilder, UserSettingsBuilder, ArticleBuilder, CommentBuilder } from "../helpers/index";


export const test = base.extend({
  app: async ({ page }, use) => {
    let application = new App(page);
    await use(application);
  },
  
  api: async ({ request }, use) => {
    let api = new Api(request);
    await use(api);
  }, 
  
  testDataUi: async ({}, use) => {
    const user = new UserBuilder()
      .addEmail()
      .addName()
      .addPassword()
      .generate();
    
    const userSettings = new UserSettingsBuilder()
      .addEmail()
      .addName()
      .addPassword()
      .addBio()
      .addImageLink()
      .generate();
    

    const article = new ArticleBuilder()
      .addTitle()
      .addDescription()
      .addBody()
      .addTags()
      .generate();

    const comment = new CommentBuilder()
      .addText()
      .generate();

    await use({ user, userSettings, article, comment });
  },
});

export const expect = baseExpect;