class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left && !this.right) this.right = node;
		else if (!this.right) this.left = node;
		node.parent = this;
	}

	removeChild(node) {
		if (node !== this.left && node !== this.right) throw new Error;
		else if (node === this.left) {
			this.left = null;
			node.parent = null;
		}
		else if (node === this.right) {
			this.right = null;
			node.parent = null;
		}
	}

	remove() {
		if (this.parent !== null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent !== null) {
			// console.log(node);
			if (this.parent.left && this.parent.right){
				let oldLeftChild = this.left;
				let oldRightChild = this.right;
				if (this === this.parent.left) {
					this.parent.parent = this;
					this.parent.left = oldLeftChild;
					if (this.left) this.left.parent = this.parent;
					if (this.right) this.right.parent = this.parent;
					this.left = this.parent;
					this.parent.right.parent = this;
					this.right = this.parent.right;
					this.parent.right = oldRightChild;
					this.parent = null;
				} else {
					this.parent.parent = this;
					this.parent.right = oldRightChild;
					if (this.right) this.right.parent = this.parent;
					if (this.left) this.left.parent = this.parent;
					this.right = this.parent;
					this.parent.left.parent = this;
					this.left = this.parent.left;
					this.parent.left = oldLeftChild;
					this.parent = null;
				}
			}
			else if (this.parent.parent === null) {
				this.parent.parent = this;
				this.parent = null;
			} else {
				let oldRoot = this.parent.parent;
				let oldChild = this.parent;
				let oldGr = this;
				this.parent.parent = this;
				if (oldRoot.left && oldRoot.left === this.parent) {
					this.parent = oldRoot;
					this.parent.left = this;
				} else if (oldRoot.right && oldRoot.right === this.parent) {
					this.parent = oldRoot;
					this.parent.right = this;
				}
				if (oldGr.left) {
					this.left = oldGr;
					this.left.left = null;
				} else {
					this.right = oldGr;
					this.right.right = null;
				}
			}
		}
	}
}

module.exports = Node;
