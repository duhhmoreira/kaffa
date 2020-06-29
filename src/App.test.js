import React from 'react';
import { validateCNPJ, intersectRectangles, areaIntersectRetangles } from './services/Validate';

test('Validate CNPJ format with mask', () =>{
  const cnpjMask = '67.709.257/0001-98';
  expect(validateCNPJ(cnpjMask)).toBe(true);
})

test('Validate CNPJ format without mask', () =>{
  const cnpjMask = '67709257000198';
  expect(validateCNPJ(cnpjMask)).toBe(true);
})

test('Validate two rectangles intersect', () =>{
  var rectA = {
    left:   10,
    top:    10,
    right:  30,
    bottom: 30
  };
  
  var rectB = {
    left:   20,
    top:    20,
    right:  50,
    bottom: 50
  };
  expect(intersectRectangles(rectA, rectB)).toBe(true);
})


test('Compute area of intersection between two rectangles', () =>{
  var rectA = {
    left:   10,
    top:    10,
    right:  30,
    bottom: 30
  };
  
  var rectB = {
    left:   20,
    top:    20,
    right:  50,
    bottom: 50
  };
  expect(areaIntersectRetangles(rectA, rectB)).toBe(100);
})
