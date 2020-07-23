const { Shop, Item } = require('./gildedRose');

it('should foo', function () {
  const gildedRose = new Shop([new Item('fixme', 0, 0)]);
  const items = gildedRose.updateQuality();
  expect(items[0].name).toBe('fixme');
});

it('has correct quality value', () => {
	const gildedRose = new Shop([new Item('Aged Brie', 10, 0)]);
	const items = gildedRose.updateQuality(55);
	expect(items[0].quality).toBe(50);
});

it('Once the sell by date has passed, Quality degrades twice as fast', () => {
	const gildedRose = new Shop([new Item('chocolate', 5, 10)]);
	const items = gildedRose.updateQuality(6);
	expect(items[0].quality).toBe(3);
});

it('The Quality of an item is never negative', () => {
	const gildedRose = new Shop([new Item('chocolate', 10, 1)]);
	const items = gildedRose.updateQuality(10);
	// never negative
	expect(items[0].quality).toBe(0);
});

it('"Aged Brie" actually increases in Quality the older it gets', () => {
	const gildedRose = new Shop([new Item('Aged Brie', 2, 0)]);
	const items = gildedRose.updateQuality(2);
	// goes up
	expect(items[0].quality).toBe(2);
	gildedRose.updateQuality(1);
	expect(items[0].quality).toBe(4);
});

it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
	const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 1, 6)]);
	let items = gildedRose.updateQuality(1);
	// goes up
	expect(items[0].quality).toBe(6);
});

it('Backstage passes 5 days or less', () => {
	const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)]);
	let items = gildedRose.updateQuality(1);
	expect(items[0].quality).toBe(3);
});

it('Backstage passes 10 days or less', () => {
	const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)]);
	let items = gildedRose.updateQuality(2);
	expect(items[0].quality).toBe(4);
});

it('Backstage passes after the concert', () => {
	const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 1, 40)]);
	// 2 days after -> missed the concert
	let items = gildedRose.updateQuality(2);
	expect(items[0].quality).toBe(0);
});

it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
	const gildedRose = new Shop([new Item('Conjured', 2, 10)]);
	const items = gildedRose.updateQuality(2);
	expect(items[0].sellIn).toBe(0);
	expect(items[0].quality).toBe(6);
	gildedRose.updateQuality(1);
	expect(items[0].sellIn).toBe(-1);
	// 6 minus 4
	expect(items[0].quality).toBe(2);
	gildedRose.updateQuality(1);
	expect(items[0].quality).toBe(0);
});

it('"Conjured" items degrade in Quality twice as fast as normal items', () => {
	const gildedRose = new Shop([new Item('Conjured', 2, 10)]);
	const items = gildedRose.updateQuality(2);
	expect(items[0].quality).toBe(6);
	expect(items[0].sellIn).toBe(0);
	gildedRose.updateQuality(8);
	expect(items[0].sellIn).toBe(-8);
	expect(items[0].quality).toBe(0);
});
