# Libreahealth Login OWA Component
This the repository for the Login OWA Component.

# Implement
1. To implement this web app first clone the repository

    git clone https://github.com/namratanehete/librehealth-signin.git

2. Install Node.js - https://nodejs.org/en/

3. Once you have npm installed, open up Terminal (or Command Prompt) and enter the following command:

        npm install -g bower

This will install Bower globally on your system.

4. Navigate directory to the downloaded folder in Terminal (or Command Prompt)
    
    cd librehealth-signin

5. Enter the following command.
    
    bower install 

This will install dependencies specified in bower.json file. Installed packages will be placed in a bower_components directory.

6. Then on Linux zip the current folder
    
    zip -r librehealth-signin.zip .
    
The crossplatform way of doing this is using Java
    
    jar -cf librehealth-signin.zip .

Once you have zipped the folder, go to the OWA module "Manage Apps" page on Advanced Administration.
    
    http://localhost:8080/lh-toolkit/module/owa/manage.form

From there, select "Browse" and choose the zip file you created. **Note** you *must* upload a **zip** file for OWA.
Finally, click on "Upload".
