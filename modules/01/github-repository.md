# Creating a Course Repository on GitHub

This tutorial will take you through the steps needed to create a __repository__ for your coursework on the website GitHub. A repository is essentially a place you will save all your work and that will keep track of the history of your work over time. On your computer it will just look like a normal folder you put files in, but it has special powers we will talk about later.

## Register for a GitHub Account

If you already have a GitHub account, skip this step. Otherwise, we need to register with GitHub so that we can create repositories that will be hosted by them (a bit like DropBox or Google Drive).

1. Go to https://www.github.com/
1. Either fill out the registration form that appears or click "Sign up" at the top right of the screen
1. Follow the steps they require to create your account, including reply to the verification email
1. Edit your profile, add an avatar image as you desire (not required)

## Create a course repository

We will create a single repository to store all your coursework in called `cart253`.

1. Go to https://www.github.com/
1. Log in if you aren't currently logged in
1. Either click on the green "New" button or click the "+" button at the top right and select "New repository"
1. Name the repository `cart253` (or something similar)
1. Add a short description like "This is Pippin Barr's coursework repository for CART253"
1. Set your repository to __Public__
1. Select "__Initialize this repository with a README__"
1. Click "Create repository"

## Set up GitHub Pages

We use a tool called __GitHub Pages__ on GitHub to be able to host our coursework on their servers, making it visible to anyone on the web if we wish. It's an amazing cheap web hosting option!

1. Go to https://www.github.com/yourgithubusername/cart253 (the homepage of your new course repository, substitute your GitHub username for `yourgithubusername` and if you called the repository something other than `cart253` use that instead)
1. Click on "Settings" (the right-most option in the repository's menu)
1. Scroll down the page to the section labelled __GitHub Pages__
1. Under __Source__ use the drop-down menu to select `master`
1. Click "Save"

## Clone (download) your repository

1. Run __GitHub Desktop__ on your computer
1. When prompted, __sign in__ with your GitHub username and password set up during your registration
1. It may ask you to set up things like an email address etc., do this if you want to
1. Go to `File > Clone Repository`
1. Select the "GitHub.com" tab
1. Under __Your Repositories__ select your `cart253` repository (the one you created for this course)
1. Under __Local Path__ select a folder you want to save the repository (a folder) into on your computer (this could be your Desktop, it could be your Documents folder, it could be wherever you keep your other courses' materials, whatever suits you)
1. Click "Clone" and the repository will be __downloaded__ and it will also show up in your GitHub Desktop

You're now ready to use GitHub Desktop and GitHub to save and synchronize all the projects you will end up creating for this course! As a simple rule, you should just keep all your work for the course in this `cart252` repository folder.

## Summary

We now have a GitHub account. We also have a __repository__ (like a special folder that keeps track of your work over time) that exists locally on __your computer__ (as a folder called `cart253` or similar) and also remotely on __GitHub.com__ (as a repository homepage called `cart253`). By keeping these two instances of the repository in synch, we can avoid many, many problems and also share our work much more easily. Because we enabled GitHub Pages, we can also share our work with anyone via a URL.
