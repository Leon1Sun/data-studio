import DrawBoard from './DrawBoard.vue';
import Draggable from './Draggable.vue';
import Vue from 'vue';
export default DrawBoard;
const EventBus = new Vue();

interface Point {
	x: number;
	y: number;
}
type Offset = Point;
class Rectangle {
	public x: number;
	public y: number;
	public height: number;
	public width: number;
	constructor(x = 0, y = 0, h = 0, w = 0) {
		this.x = x;
		this.y = y;
		this.height = h;
		this.width = w;
	}

	public setPosition(point: Point) {
		this.x = point.x;
		this.y = point.y;
	}
}
export { Draggable, EventBus, Point, Offset, Rectangle };
