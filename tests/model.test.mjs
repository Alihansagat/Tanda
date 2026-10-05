import {test} from 'node:test';import assert from 'node:assert/strict';import {match,extract,cosine} from '../dist/model.mjs';
test('identical documents match fully',()=>{const s='Python SQL Pandas Docker Git machine learning';assert.equal(match(s,s).score,100)});
test('unrelated documents do not match',()=>assert.equal(match('flowers water garden sunshine soil','Python SQL Docker Git Pandas').score,0));
test('aliases and word boundaries',()=>{assert.deepEqual(extract('питон sklearn PostgreSQL github'),['Python','SQL','Scikit-learn','Git']);assert.deepEqual(extract('digital reacting'),[])});
test('skill gaps are explicit',()=>assert.deepEqual(match('Python SQL Pandas analysis projects','Python SQL Pandas Docker Git').missing,['Docker','Git']));
test('missing vocabulary falls back to text',()=>{const s='creative writing editing books stories';const r=match(s,s);assert.equal(r.coverage,null);assert.equal(r.score,100)});
test('invalid inputs rejected',()=>{assert.throws(()=>match('',''));assert.throws(()=>match(null,'Python'));assert.throws(()=>match('word '.repeat(11000),'Python SQL Docker Git Pandas'))});
test('cosine is symmetric and bounded',()=>{const a='Python SQL SQL Pandas',b='SQL Docker projects';assert.equal(cosine(a,b),cosine(b,a));assert.ok(cosine(a,b)>=0&&cosine(a,b)<=1)});
