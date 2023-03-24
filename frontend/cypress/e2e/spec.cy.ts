describe('PicPlace', () => {
  beforeEach(() => {
    cy.request('POST', 'http://127.0.0.1:5000/test/reset');
    const user = {
      username: 'testi',
      password: 'testi123',
      admin: false,
    };
    cy.request('POST', 'http://127.0.0.1:5000/api/register', user);
    const user2 = {
      username: 'testiadmin',
      password: 'testi123',
      admin: true,
    };
    cy.request('POST', 'http://127.0.0.1:5000/api/register', user2);
  });

  describe('general', () => {
    it('front page can be opened', () => {
      cy.visit('/');
      cy.contains('PicPlace');
    });
  });

  describe('sign up', () => {
    it('registering new user works', () => {
      cy.register_user('testi1', 'testi1234');
      cy.contains('testi1 registered succesfully');
    });

    it('registering new user with existing username fails', () => {
      cy.register_user('testi', 'testi1234');
      cy.contains('Registration failed');
    });
  });

  describe('login', () => {
    it('logging in works', () => {
      cy.login('testi', 'testi123');
      cy.contains('Login successful');
    });

    it('logging in with wrong password fails', () => {
      cy.login('testi', 'testi1234');
      cy.contains('Login failed');
    });

    it('logging in with wrong username fails', () => {
      cy.login('testi12', 'testi123');
      cy.contains('Login failed');
    });
  });

  describe('navbar', () => {
    it('correct content when logged out', () => {
      cy.visit('/');
      cy.get('button[aria-label="HomeButton"]').should('be.visible');
      cy.contains('Login');
      cy.contains('Sign Up');
      cy.get('button[aria-label="InfoButton"]').should('be.visible');
    });

    it('correct content when logged in', () => {
      cy.login('testi', 'testi123');
      cy.get('button[aria-label="HomeButton"]').should('be.visible');
      cy.contains('Logout');
      cy.contains('Gallery');
      cy.contains('testi')
      cy.get('button[aria-label="InfoButton"]').should('be.visible');
    });

    it('correct content when logged in as admin', () => {
      cy.login('testiadmin', 'testi123');
      cy.get('button[aria-label="HomeButton"]').should('be.visible');
      cy.contains('Logout');
      cy.contains('Gallery');
      cy.contains('testiadmin')
      cy.contains('Admin')
      cy.get('button[aria-label="InfoButton"]').should('be.visible');
    });

    it('logout works', () => {
      cy.login('testi', 'testi123');
      cy.contains('Logout').click();
      cy.contains('Login');
    });

    it('gallerylink works', () => {
      cy.login('testi', 'testi123');
      cy.contains('Gallery').click();
      cy.contains('Welcome to PicPlace-Gallery');
      cy.url().should('include', '/gallery');
    });

    it('info contains correct info and can be closed', () => {
      cy.visit('/');
      cy.get('button[aria-label="InfoButton"]').click();
      cy.contains('At PicPlace users can upload pictures and share them with others. Users can also search for pictures and view them.');
      cy.get('button[aria-label="CloseInfo"]').click();
    });

    it('homebutton works', () => {
      cy.visit('/gallery');
      cy.get('button[aria-label="HomeButton"]').click();
      cy.contains('Welcome to PicPlace');
      cy.url().should('include', '/');
    });
  });
    
    describe('images', () => {
      it('uploading image works', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
      });

      it('uploaded image is presented on the carousel with correct info', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('Helsingin suunnistajat') // the caption on the carousel
      })

      it('uploading other than image does not work', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.contains('Gallery').click();
        cy.url().should('include', '/gallery');
        cy.contains('Upload a picture').click();
        cy.contains('image').selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
        cy.should('not.contain', 'Upload') // the dropzone doesn't allow anything other to be dropped than images
      });

      it('uploading multiple image works', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.upload('josses.jpg', 'Fallen tractor')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
      });

      it('carousel works with multiple photos (without button-click)', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.upload('josses.jpg', 'Fallen tractor')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('Helsingin suunnistajat') // the caption on the carousel
        cy.wait(5000) // time of the carousel to automatically move to next picture
        cy.contains('Fallen tractor') // caption of the second image
      })

      it('carousel works with multiple photos (with button-click)', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.upload('josses.jpg', 'Fallen tractor')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('Helsingin suunnistajat') // the caption on the carousel
        cy.get('button[aria-label="right-arrow"]').click() // carousel button
        cy.contains('Fallen tractor') // caption of the second image
      })
      it('deleting images (user-page)', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('testi').click() // to user's page
        cy.get('button[name="Delete Image"]').eq(0).click();
        cy.get('button[name="Confirm action"]').click(); // the confirm window for deleting
        cy.contains('Picture deleted')
        cy.contains('You have not uploaded any pictures yet')
      });
      it('deleting other users images (admin-page)', () => {
        cy.login('testi', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('Logout').click()
        cy.login('testiadmin', 'testi123')
        cy.contains('Admin Page').click() // to admin page
        cy.get('button[name="Delete Image"]').eq(0).click();
        cy.get('button[name="Confirm action"]').click(); // the confirm window for deleting
        cy.contains('Picture deleted')
        cy.contains('There are no pictures uploaded to PicPlace yet')
      });
      it('can not delete other users images without admin rights', () => {
        cy.login('testiadmin', 'testi123');
        cy.contains('Login successful')
        cy.upload('HS.jpg', 'Helsingin suunnistajat')
        cy.wait(1000) // this is cause the upload takes some time to be uploaded to aws thus be completed
        cy.contains('Upload successful');
        cy.contains('Logout').click()
        cy.login('testi', 'testi123')
        cy.contains('testi').click() // to user's page
        cy.contains('You have not uploaded any pictures yet') // doesn't show other users photos
      });
      


  });

});
