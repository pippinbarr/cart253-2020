# Fonts {

---

## In this module...

- Using Google fonts
- Loading fonts

---

## Using Google fonts

We can use Google fonts in our p5 projects! Here's the process.

### 1. Choose a Google font you like

Go to https://fonts.google.com and locate your font, clicking through to its page.

e.g. https://fonts.google.com/specimen/Sansita+Swashed?sidebar.open=true

### 2. Choose the style you like

Look at the different text styles and click "Select this style" for the styles you want to use in your project.

e.g. "Light 300"

### 3. Get the embed link for the font

In the "Selected family" tab on the right, choose the "Embed" option and __copy__ the `<link>` tag. __Paste__ the link tag into your `index.html`, ideally __before__ the `<link>` tag for your CSS.

e.g.

```html
<link href="https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300&display=swap" rel="stylesheet">
```

### 4. Remember the font-family name

Look at the CSS rules for specifying the font family name.

e.g. `Sansita Swashed`

### 5. Use the font-family name in `textFont()`

Use the `textFont()` function to specify you want to use your new font:

e.g.

```javascript
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  push();
  fill(255);
  // Using textFont() to set the font to our embedded font
  textFont(`Sansita Swashed`);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Isn't it lovely?`, width / 2, height / 2);
}
```

### Alternative: use an `@import` command in CSS

Instead of using a `<link>` tag, Google also provides an option for using the `@import` command. To use this you place the provided `@import` command at the top of your CSS.

```css
@import url('https://fonts.googleapis.com/css2?family=Sansita+Swashed:wght@300&display=swap');

body {
  padding: 0;
  margin: 0;
}

canvas {
}
```

---

## Loading a local font file

We can also load a font __file__ in p5 if we've downloaded a font in the `.ttf` or `.otf` formats. This is useful because a loaded font will work even if you are not currently online. (Whereas a Google font only works if you're connected to the internet.)

### 1. Find and download your font

You can download Google fonts in the `.ttf` format by clicking the "Download family" button on a Font's page. You will download a `.zip` file which you extract to find the `.ttf` file in a folder.

e.g. `SansitaSwashed-VariableFont_wght.ttf`

You can find font files all over the internet. Consider https://www.dafont.com/, https://www.fontsquirrel.com/, https://www.fontspace.com/, etc.

Make sure you __follow their copyright guidelines__, including attribution.

### 2. Put the font file in your project

Create an `assets/fonts` folder and put the `.ttf` file in it.

e.g. `assets/fonts/SansitaSwashed-VariableFont_wght.ttf`

### 3. Load the font with `loadFont()` and use `textFont()` to use it

Just as with images and sounds, we can load fonts into a variable in the `preload()` function, then use the font via the variable.

```javascript
// A variable to store the font in
let sansitaFont;

// Load the font in preload
function preload() {
  sansitaFont = loadFont(`assets/fonts/SansitaSwashed-VariableFont_wght.ttf`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  push();
  fill(255);
  // Use the font by passing the font variable as an argument to textFont()
  textFont(sansitaFont);
  textAlign(CENTER, CENTER);
  textSize(32);
  text(`Isn't it lovely?`, width / 2, height / 2);
}
```

---

## Summary

- We can use custom fonts in our p5 projects
- We use `textFont()` to specify the font for our text
- We can use Google fonts via `<link>` tag in our `index.html` or `@embed` in our CSS
- We can download and use `.ttf` or `.otf` font files by loading them with `loadFont()`

---

# }
