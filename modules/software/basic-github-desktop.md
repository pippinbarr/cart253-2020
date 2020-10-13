# Basic Version Control with GitHub Desktop

In this course we will be using "version control". We'll achieve this via our `cart253` __Git repository__ to store all our coursework. So what is version control? What is Git? What is a repository? What is GitHub Desktop for? How do we actually use all this stuff? And why should we?

## Why?

For many tasks, just having a file that you edit and save repeatedly over time is completely fine. Maybe it's an essay for a course, maybe it's a list of all your games, maybe it's something else.

But most of us have had a situation in which we want to keep a series of __versions__ of a file. Mostly it's because if we screw up, we can more easily go back to a version that was still good. Maybe we're working on a complicated image in PhotoShop and we end up with a series of files called `cool-pic-1.psd`, `cool-pic-2.psd`, `cool-pic-2b.psd`, `cool-pic-3.psd`, and so on. The set of files end up as a kind of __history__ of the final file.

With __programming__, this idea of keeping track of the history of a coding project over time is very, very important. It's called __version control__. In part, it's important because it's good to be able to __undo__ things by going back in history. But it's also important because it's good to be able to __see__ that history to understand the project. It's especially useful if you're working with other people.

Git and other version control software is so popular and so important in the programming world that it is __essential__ that you understand how it works and how to use it. It will be part of getting a job later, as well as making your life better forever.

## What is Git? A repository? GitHub Desktop?

__Git__ is software that helps to automatically keep track of the history of versions of our files. For any project, we create a __Git repository__ (often called a "repo") which is like a folder that tracks the history of everything that happens in it. We will use __GitHub Desktop__ to manage our repository easily.

## How does the tracking process work?

In order to use __Git__ we need to change the way we work a little bit. As well as having our set of files for a project (like the HTML, CSS, JavaScript, images, etc.) and saving them each time we make changes, we need to add an extra layer.

### Use the repository folder!

First, we must always do our work __inside the repository folder__ on our computer. We have a folder called `cart253` and we will do __all our work__ in that folder. If you're starting a new project, for example, you would make a new folder inside `cart253` called something like `projects` and then a folder inside that for the specific project called something like `project1`.

For now, we will focus on the file that should already be in your `cart253` from when you created it called `README.md`. (If it doesn't exist for some reason, please create a new file with that name in __Atom__ and save it into your `cart253` folder.)

By default, this file has placeholder text in it that is not very informative. Let's __edit__ the file and use this to show Git at work.

### Edit README.md

1. Open the `README.md` file in your `cart253` repository folder in Atom. (You can do this by selecting `File > Open...` in Atom and finding the file, you can probably right click on the file and choose to open it with Atom, you can probably drag the file onto the Atom icon at the bottom of your screen.)
1. With the file open, change the file so that it contains the course code and course title ("CART253 - Creative Computation I")
1. Save the file.
1. Notice how the places you made __changes__ are now __highlighted in orange__. This is because Atom knows your file is in a Git repository and therefore cares about tracking what has changed.

Let's imagine the changes that we made are worth not just __saving__ but also keeping specific track of in our repository.

### See the changes

To see that GitHub Desktop has __noticed__ the changes we made, we need to run it and look at the interface.

1. Open GitHub Desktop (log in if you need to)
1. If you only have your `cart253` repository it should show by default. (If it isn't selected, click the button at the top right where it says "Current Repository" and select your `cart253` repository from the list.)
1. Notice that next to the "Changes" tab (on the left) there is now a "(1)", indicated that one file has been changed in the repository. Below, you can see all the files that have been changed listed, which should just be `README.md`. If you select the file, you'll the specific changes displayed on the right side of the application.

### Commit the changes

When we want to add changes to our repository it is called a __commit__. We're saying we want to commit to these changes because we're sure we want them in our project. Importantly, when we commit, we also write a __message__ that describes our changes precisely.

Let's say we're happy with the changes we made to `README.md`. (If not, go back to Atom and change it more, then save it again and come back to GitHub Desktop.)

1. At the bottom left of the "Changes" tab there is a small interface to __commit__ our changes.
1. There is a small field which defaults to "Update README.md", and a longer field called "description".
1. In the small field, write a short message that explains the changes you made to `README.md`. (Something like: "Initialized README to contain course code and title")
1. If you want to, write a longer description in the "description" field.
1. Click the blue "Commit to master" button at the bottom!

The changes are committed along with your message! The new version of `README.md` with your changes is now part of the repository on your computer and you will see there are now no changes displayed by GitHub Desktop.

### View the history

To prove to yourself that the changes and the message are really there, go to the "History" tab next to the "Changes" tab. You will see a list of the __commit history__ of your `cart253` repository. Right now it is probably small, but it will get very long. The most recent commit is at the top, and it should have the message you just wrote.

If you select the commit in the history, you can also see a list of the files that were changed and the changes that were made to them.

### Continue making changes

Let's imagine that `README.md` is part of some larger project and we want to keep working on it. We would follow this same process of making some changes and then, when a set of related changes have been made, commit them.

1. In Atom and add your name to the `README.md` file and save it
1. In GitHub Desktop, confirm that the new changes are noticed by GitHub Desktop in the "Changes" tab
1. Write a commit message like "Added my name to the README"
1. Click the "Commit to master" button

If you want to, look at the History again to see your two separate commits are listed there.

### Push the changes

Currently the repository on your computer is up to date, but the version of your repository that lives on GitHub.com is not. We always want these two versions of the repository to be in synch to avoid trouble. To update the GitHub.com repository (called the __remote__ repository) we need to __push__ the changes we've made to it (it's just like __uploading__ them).

1. In GitHub Desktop, notice the "Push origin" button in the top menu bar (it has a little "up arrow" beside it). The number beside it is the number of new commits made that must be uploaded or __pushed__ to GitHub.com
1. Click the button.

After a hopefully short time, your changes (the commits) will have been uploaded to GitHub.com. This is great because they are safe there now ("in the cloud"). If you were to accidentally delete the `cart253` folder (repository) on your computer, it would be fine because you could get all your files back from GitHub.com!

### Adding and removing files

Any time you __add__ a new file to your repository folder or __remove__ a file from the repository, this __counts as a change__. To try it out let's add a file.

1. Make a new file in Atom with `File > New File`
1. Write some text in it (it doesn't matter what)
1. Save the file with `File > Save` and give it a name (doesn't matter what) and make sure to save it inside the `cart253` folder
1. Go to GitHub Desktop and notice that this added file is now listed as a change to the repository!
1. Write a commit message and click "Commit to master" to commit it to the local repository
1. Click "Push origin" to upload the changes to GitHub.com

Now let's delete the file we just created.

1. In the `cart253` folder on your computer, move the new file to the Trash or Recycle Bin, or just somewhere outside your `cart253` folder
1. Go to GitHub Desktop and notice that removing the file is now listed as a change to the repository!
1. Write a commit message and click "Commit to master" to commit it to the local repository
1. Click "Push origin" to upload the changes to GitHub.com

Notice that your History in GitHub Desktop now includes at least two commits from editing `README.md`, one commit for adding the new file, and another commit for removing it. Even though adding and then removing the file leaves the repository exactly the way it was, it's still part of the __commit history__.

### More than one file

Although we've only been editing a single file (`README.md`) or adding and removing a single file each commit and push, normally you would end up editing/adding/removing multiple files in a single block of work and then committing all those changes at once.

We will talk more about "when to commit" once we get to actual code, but the basic rule of thumb is to commit your changes when they represent a meaningful unit of work.

### Edit, save, commit, push

This is the new working approach in this course. Instead of just "edit, save, edit, save" as with ordinary software, we add "commit, push, commit, push, commit, commit, push" to the cycle.

1. First we __edit__ (or __add__ or __remove__) one or more files in our project (like `README.md` in this tutorial) in Atom
1. Then we __save__ the changes we made in Atom (to save them to the local version of the file)
1. Then we __commit__ the changes we made in GitHub Desktop (to add them to the local version of the repository)
1. Then we __push__ the changes we made to GitHub.com (to save the in the remote version of the repository)

This will take some getting used to, but that's pretty much all there is to it. Another tutorial we cover these ideas again in the specific context of __code__!
