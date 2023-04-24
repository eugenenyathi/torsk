# Torsk

- is a IT Asset Management Software, that allows you to keep track of your servers, desktops, routers, switches etc, with this software
  you know how many of that and this which you have, whose is the user, where is it. All of those at once.

### Pre-requisites

1. [Git - URL](https://git-scm.com/download/win)
2. [Docker Desktop - URL](https://www.docker.com/products/docker-desktop/)

### How to get started

- Open your powershell/terminal, then run the following commands

1. Let's navigate to your desktop run: `cd ~/Desktop/`
2. Run this to get the code `git clone https://github.com/eugenenyathi/torsk.git`
3. Then move into the newly created folder run: `cd torsk`
4. Let's change the git branch run: `git checkout docker`
5. Finally let's start the app run: `docker compose up -d`
6. Lastly open a new powershell/terminal tab/instance and run `docker ps`, if everything
   now has status of `started some minutes/seconds ago`, you are all set.
7. To start using the app, navigate to localhost:8184 on your browser. enjoy!

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

1. You might find problems when adding and removing machines from being faulty or decommissioned, we are
   still working on stabilizing this feature.
2. You might also run into CRUD (create, read, update and delete) errors for any section, whether router,
   desktop or email. If you run into such please report the issue on whatsapp on `263 78 456 2079`, otherwise
   email to `eugenenyathi07@gmail.com` and we will fix the problem for future stable releases.
