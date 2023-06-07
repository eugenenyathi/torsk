# Torsk

- is a IT Asset Management Software, that allows you to keep track of your servers, desktops, routers, switches etc, with this software
  you know how many of that and this which you have, whose is the user, where is it. All of those at once.

### Pre-requisites

1. [Git - URL](https://git-scm.com/download/win)
2. [Docker Desktop - URL](https://www.docker.com/products/docker-desktop/)

### How to get started

- Open your powershell/cmd, then run the following commands

1. Let's navigate to your desktop run: `cd ~/Desktop/`
2. Run this to get the code `git clone https://github.com/eugenenyathi/torsk.git`
3. Close your powershell/cmd

### To start the frontend of the app

- Open your powershell/cmd, then run the following commands

1. Lets navigate into the client folder `cd ~/Desktops/torsk/client`
2. To start the frontend service run `npm run serve`
3. DO NOT CLOSE CMD/POWERSHELL

### To start the backend of the app

- Open another powershell/cmd, then run the following commands

1. Lets navigate into the server folder `cd ~/Desktops/torsk/server`
2. To start the backend service run `nodemon`
3. DO NOT CLOSE CMD/POWERSHELL

### To use the app

1. Open your browser, in the address bar type `localhost:8081`
2. Enjoy

## Policies

1. You can only sign up once and thereafter you can not create users anymore. However in the future,
   we will add the feature to add more users internally once the first account has been created.
2. There is no reset-password/forgot-password option, you can only change your password under Settings once you have logged in, this is so because an IT person shouldn't forgot their password.
3. If you forget your password, you are locked out permanently. There is no way to recover your account.
4. Your dashboard won't show anything until you start adding your desktops or routers etc.
5. You can not add a remote desktop address without adding the machine first, this means no machine
   , no remote desktop.
6. Policy number 5 also applies to Printers & Scanners, you can only add a printer to an existing desktop
7. We have prefilled some forms to speed up the process of adding new devices because this release is a
   testing environment.

## Known issues

1. Any page refresh will through a `localhost page not found error`, to clear the error, change your url to `localhost:8384/`, we are working on to find the trouble causer.
2. You might find problems when adding and removing machines from being faulty or decommissioned, we are
   still working on stabilizing this feature.
3. You might also run into CRUD (create, read, update and delete) errors for any section, whether router,
   desktop or email. If you run into such please report the issue on whatsapp on `263 71 259 7570` or
   email to `eugenenyathi07@gmail.com` and we will fix the problem for future stable releases.
