import { Car, object, animation, interpolator } from "newcar"

const car = new Car(document.getElementById("mycanvas"), 60);

const func1 = new object.MathImage((x) => Math.sin(x), 0, 0, {
  color: "#FFFFFF",
  lineWidth: 3,
});
const func2 = new object.MathImage((x) => Math.cos(x), 0, 0, {
  color: "skyblue",
  lineWidth: 3,
});
const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 100,
  y: 300,
  children: [func1, func2],
});

const math = new object.HTMLPlugin(`
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>y</mi>
  <mo>=</mo>
  <mi>sin</mi>
  <mo>&#x2061;<!-- ⁡ --></mo>
  <mi>x</mi>
</math>
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>y</mi>
  <mo>=</mo>
  <mi>cos</mi>
  <mo>&#x2061;<!-- ⁡ --></mo>
  <mi>x</mi>
</math>`
, {
  transparency: 0,
  x: 300,
  y: 225,
  scaleX: 2,
  scaleY: 2
})

car.addObject(system, math);

car
  .addAnimationItem(
    new animation.AxisLimit2d(system, {
      startAt: 0,
      lastsFor: 50,
      to: [600, 200, 0, 0],
      by: interpolator.easeOutSine,
    })
  )
  .addAnimationItem(
    new animation.Limit(func1, {
      startAt: 50,
      lastsFor: 800,
      to: [0, 12],
    })
  )
  .addAnimationItem(
    new animation.Limit(func2, {
      startAt: 50,
      lastsFor: 800,
      to: [0, 12],
    })
  )
  .addAnimationItem(
    new animation.Scale(system, {
      startAt: 450,
      lastsFor: 50,
      by: interpolator.easeOutSine,
      to: [0.5, 0.5],
    })
  )
  .addAnimationItem(
    new animation.Translation(system, {
      startAt: 450,
      lastsFor: 50,
      to: [400, 150],
    })
  )
  .addAnimationItem(
    new animation.Transparency(math, {
      startAt: 500,
      lastsFor: 30,
      to: 1,
    })
  );

car.play();

car.exports(1, 850, (url) => {
  console.log(url);
});

