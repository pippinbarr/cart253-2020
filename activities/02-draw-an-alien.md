# Activity 02: Draw an Alien {

## Objectives

This activity has two key objects

- Use p5's drawing instructions to draw an alien
- Practice using Git and GitHub Desktop to keep track of your work

---

## Create a new project

First we will want to start a fresh project using the p5 template project for this activity.

1. Download [template-p5-project.zip](https://pippinbarr.github.io/cart253-2020/templates/template-p5-project.zip) and unzip it
2. Rename the folder from `template-p5-project` to `02-draw-an-alien`
3. Move the folder into your `cart253` repository folder inside a new `activities` folder
4. In GitHub Desktop, commit with a message like "Activity 02: Started the draw an alien activity" and push

This is how we should __always__ start any new project, whether it's an experimental sandbox for lecture topics, an activity like this, or our final project.

---

## Make a plan

If you want to go totally off road and draw an alien completely of your own devising, go for it. It's still a good idea to have a plan though! Remember that when we draw we're drawing in layers from the back to the front, layering them on top of each other. So here's a possible plan for an alien:

- First we'll set up the canvas
- Then we'll fill in the background color
- We'll draw an ellipse for the body and other for the head
- Then we'll draw eyes, nostrils, and a mouth on top of the head

It'll be basic, and we'll have to think about colors etc., but it should work!

---

## Set the canvas size

The first thing we want to do is specify the dimensions of our canvas. We'll do all our drawing in `setup()` so just keep all your instructions in there.

1. Use the `createCanvas()` function to set the dimensions of your canvas to 640x480

---

## Color in the background

Let's make the background pink!

1. Use the `background()` function to paint the background color to pink

---

## Draw a body

Before we actually draw the body, we need to remember to set up our stroke and fill colors. In this case, let's have no stroke, and a grey fill. We'll draw the body at the bottom centre of the canvas.

1. Use `noStroke()` to remove the stroke color
2. Use `fill()` to set the fill to mid-level grey
3. Use `ellipse()` to draw a body half-off the bottom centre of the canvas

---

## Draw a head

Aliens' heads are often depicted as long ovals, so let's take that idea. We'll set the fill to a slightly darker grey to make it stand out against the body.

1. Use `fill()` to set a slightly darker fill color (note how `noStroke()` still applies)
2. Use `ellipse()` to draw a vertically elongated oval on top of the body in the centre of the screen

---

## Draw the eyes

The eyes should probably be big and black, so we'll need to change the fill color before we drawn them.

1. Use `fill()` to change the fill color to black
2. Use `ellipse()` to draw the first eye as an elongated oval to the left side of the face
3. Use `ellipse()` to draw the other eye to the right side of the face

---

## Draw the nostrils

The nostrils can be little circles between the eyes toward their bottoms. No need to change colors with `fill()`.

1. Draw the left nostril as a small circle slightly to the left of the centre and toward the bottom of the eyes.
2. Draw the right nostril the same way, but slightly to the right.

---

## Draw the mouth

Let's draw the mouth as a rectangle under the nostrils. We'll make its stroke a red color and its fill black still. We'll change the size of the line being used with `strokeWeight()` to have some "lips". We'll use `rectMode()` to draw our rectangle from the centre to make it easier.

1. Use `stroke()` to set the stroke color to a red
2. Use `strokeWeight()` to set a bigger thickness for the lines (look it up in the reference)
3. Use `rectMode()` to set the drawing mode to the centre
4. Use `rect()` to draw the mouth below the nostrils in the centre horizontally

---

## Commit and push

We now have a __very convincing alien__ on our screen. Try not to run away in fear! Before we do anything else, we've now done a chunk of significant work, so we should __commit__ and __push__ this code.

1. Save your work if you haven't already
2. Go to GitHub Desktop and make sure the changes are there
3. Write a commit message like "Activity 02: Drew an amazing alien" and click "Commit to master"
4. Click "Push origin" to upload it all

---

## Check it out on the internet!

Now that we have pushed our changes to GitHub.com we can view our work online. For example, Pippin's are at

https://pippinbarr.github.io/cart253/activities/02-draw-an-alien/

Make the appropriate substitutions to that URL to match your username, repository name, activities folder, and folder name and you'll be able to see yours too!

---

## Improvements?

There is, let's say, quite a lot of room for improvement here.

- Think about ways you could make this drawing look better with different shape and color choices.
- Think about a completely different vision.
- Think about reading the Shape and Color sections of the reference to learn new functions that might help you make an even better picture of an alien!

If you make improvements, remember that after you've done a good chunk of work (like added a hat?!) you should __commit__ and __push__ those changes.
