# react-native-animated-math

[![npm version](https://badge.fury.io/js/react-native-animated-math.svg)](https://badge.fury.io/js/react-native-animated-math)
![license](https://img.shields.io/github/license/rastapasta/react-native-animated-math.svg)

An Animated API math extension - implementing sine, cosine, tangent and others as AnimatedNodes.

All calculations are implemented based on chained

* Animated.add
* Animated.divide
* Animated.multiply
* Animated.modulo

and representing animation nodes fully compatible with [Native Driver](https://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated) driven animations.

## Getting started

Simply add it to your project by calling

`$ react-native add react-native-animated-math`

## Usage

Simple example of using the `AnimatedMath` methods to realize a natively animated circular moving view:

```js
import React from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import AnimatedMath from 'react-native-animated-math';

export default class Rotator extends React.Component {
  state = {
    angle: new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate(rotation = 1) {
    Animated.timing(this.state.angle, {
      toValue: rotation * 2 * Math.PI,
      duration: 4000,
      useNativeDriver: true
    }).start(() => this.animate(rotation + 1))
  }

  render() {
    let {angle} = this.state,
      radius = 130;

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.dot, {
          transform: [
            {translateX: Animated.multiply(AnimatedMath.sin(angle), radius)},
            {translateY: Animated.multiply(AnimatedMath.cos(angle), -radius)},
          ]
        }]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
  }
});
```

## License

#### The MIT License (MIT)

Copyright (c) 2019 Michael Straßburger

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
