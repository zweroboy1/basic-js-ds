const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  #rootNode = null;

  root() {
    return this.#rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.#rootNode === null) {
      this.#rootNode = newNode;
    } else {
      let currentNode = this.#rootNode;
      while (currentNode !== null) {
        if (currentNode.data > data) {
          if (currentNode.left === null) {
            currentNode.left = newNode;
            break;
          }
          currentNode = currentNode.left;
        } else {
          if (currentNode.right === null) {
            currentNode.right = newNode;
            break;
          }
          currentNode = currentNode.right;
        }
      }
    }
  }

  has(data) {
    if (this.#rootNode === null) {
      return false;
    }
    let currentNode = this.#rootNode;
    while (currentNode !== null) {
      if (currentNode.data === data) {
        return true;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  find(data) {
    if (this.#rootNode === null) {
      return null;
    }
    let currentNode = this.#rootNode;
    while (currentNode !== null) {
      if (currentNode.data === data) {
        return currentNode;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  remove(data) {
    const removeNode = (currentNode, data) => {
      if (currentNode === null) {
        return null;
      }
      if (currentNode.data === data) {
        if (currentNode.left === null && currentNode.right === null) {
          return null;
        }
        if (currentNode.left === null) {
          return currentNode.right;
        }
        if (currentNode.right === null) {
          return currentNode.left;
        }
        let minNode = currentNode.right;
        while (minNode.left !== null) {
          minNode = minNode.left;
        }
        currentNode.data = minNode.data;
        currentNode.right = removeNode(currentNode.right, minNode.data);
      } else if (currentNode.data > data) {
        currentNode.left = removeNode(currentNode.left, data);
      } else {
        currentNode.right = removeNode(currentNode.right, data);
      }
      return currentNode;
    };
    this.#rootNode = removeNode(this.#rootNode, data);
  }

  min() {
    if (this.#rootNode === null) {
      return null;
    }
    let currentNode = this.#rootNode;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode.data;
  }

  max() {
    if (this.#rootNode === null) {
      return null;
    }
    let currentNode = this.#rootNode;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
