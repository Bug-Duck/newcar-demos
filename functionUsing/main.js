import { Car, object, animation, interpolator } from "newcar"

const car = new Car(document.getElementById("mycanvas"), 60);

const func1 = new object.MathImage((x) => 100 * Math.sin(0.1 * x), 0, 0, {
  color: "#FFFFFF",
  lineWidth: 3,
});
const func2 = new object.MathImage((x) => 100 * Math.cos(0.1 * x), 0, 0, {
  color: "skyblue",
  lineWidth: 3,
});
const system = new object.CoordinateSystem(0, 0, 0, 0, {
  x: 100,
  y: 300,
  children: [func1, func2],
});
// const text = new Text("100·sin(0.1x) 100·cos(0.1x)", {
//   size: 30,
//   align: "center",
//   x: 400,
//   y: 300,
//   transparency: 0,
// });
const math = new object.HTMLPlugin(`
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>y</mi>
  <mo>=</mo>
  <mn>100</mn>
  <mo>&#x00D7;<!-- × --></mo>
  <mi>sin</mi>
  <mo>&#x2061;<!-- ⁡ --></mo>
  <mn>0.1</mn>
  <mi>x</mi>
</math>
<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
  <mi>y</mi>
  <mo>=</mo>
  <mn>100</mn>
  <mo>&#x00D7;<!-- × --></mo>
  <mi>cos</mi>
  <mo>&#x2061;<!-- ⁡ --></mo>
  <mn>0.1</mn>
  <mi>x</mi>
</math>`
, {
  transparency: 0,
  x: 300,
  y: 225
})

car.addObject(system).addObject(math);

car
  .addAnimationItem(
    new animation.AxisLength({
      startAt: 0,
      lastsFor: 50,
      to: [600, 200, 0, 0],
      bindTo: system,
      by: interpolator.easeOutSine,
    })
  )
  .addAnimationItem(
    new animation.Limit({
      startAt: 50,
      lastsFor: 800,
      to: [0, 500],
      bindTo: func1,
    })
  )
  .addAnimationItem(
    new animation.Limit({
      startAt: 50,
      lastsFor: 800,
      to: [0, 500],
      bindTo: func2,
    })
  )
  .addAnimationItem(
    new animation.Scale({
      startAt: 450,
      lastsFor: 50,
      by: interpolator.easeOutSine,
      to: [0.5, 0.5],
      bindTo: system,
    })
  )
  .addAnimationItem(
    new animation.Translation({
      startAt: 450,
      lastsFor: 50,
      to: [400, 150],
      bindTo: system,
    })
  )
  .addAnimationItem(
    new animation.Transparency({
      startAt: 500,
      lastsFor: 30,
      to: 1,
      bindTo: math,
    })
  );

car.play();

car.exports(1, 850, (url) => {
  const element = document.getElementById("video");
  element.innerHTML = "Click here to jump to video file";
  element.href = url;
  console.log(url);
});

