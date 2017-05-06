/*
* react-native-animated-math
* https://github.com/rastapasta/react-native-animated-math
*
* Supplies mathematic logic and approximizations by combining
*   Animated.add
*   Animated.multiply
*   Animated.divide
*   Animated.modulo
*
* @flow
*/

import { Animated } from 'react-native';

const
  sinus = (
    node: Animated | number
  ): Animated => {
    // Normalize the angle into the 'precise' range
    let angle = __normalize(node);

    // Taylor series approximation of sine curve near origin:
    // sin x = x − x^3/3! + x^5/5! − x^7/7!
    return Animated.add(
      Animated.add(
        angle,
        Animated.divide(pow(angle, 3), -__factorial(3))
      ),
      Animated.add(
        Animated.divide(pow(angle, 5), __factorial(5)),
        Animated.divide(pow(angle, 7), -__factorial(7))
      )
    );
  },

  cosinus = (
    node: Animated | number
  ): Animated =>
    sinus(Animated.add(Math.PI/2, node)),

  tangens = (
    node: Animated | number
  ): Animated =>
    Animated.divide(sinus(node), cosinus(node)),

  pow = (
    node: Animated | number,
    times: Animated | number
  ): Animated | number =>
    times == 0 ? 1 :
    times == 1 ? node :
    Animated.multiply(node, pow(node, Math.floor(times)-1)),

  substract = (
    a: Animated | number,
    b: Animated | number
  ): Animated =>
    Animated.add(a, Animated.multiply(b, -1)),

  __normalize = (
    node: Animated | number
  ): Animated =>
    Animated.add(
      Animated.modulo(Animated.add(node, Math.PI), 2*Math.PI),
      -Math.PI
    ),

  __factorial = (
    n: number
  ) : number => {
    let sum = n;
    while(n>2)
      sum *= --n;
    return sum;
  };

export default {
  sinus,
  cosinus,
  tangens,
  pow,
  substract
};
