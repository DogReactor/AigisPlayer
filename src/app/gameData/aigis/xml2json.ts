class Node {
  public name: string;
  public args: { [key: string]: string } = {};
  public value: string;
  public type: "object" | "array";
  public obj: { [key: string]: any } | Array<any> = {};
  public hasChild = false;
  public constructor(tagname?: string) {
      if (tagname) {
          const rawArgs = tagname.split(' ');
          this.name = rawArgs[0];
          // 处理标签中的参数
          if (rawArgs.length > 1) {
              for (let i = 1; i < rawArgs.length; i++) {
                  const arg = rawArgs[i];
                  const sa = arg.split('=');
                  this.args[sa[0]] = sa.length > 1 ? sa[1].replace(/"/g, '') : '';
              }
          }
          if (this.args.T) {
              this.obj = [];
          }
      }
  }
  public addToContent(node: Node) {
      if (this.obj instanceof Array) {
          this.obj.push(node.toJSObj());
      } else {
          this.obj[node.name] = node.toJSObj();
      }
      this.hasChild = true;
  }
  public toJSObj() {
      if (!this.hasChild) { return this.value; }
      // 如果只有一个值，直接返回
      if (this.obj instanceof Array && this.obj.length === 1) { return this.obj[0]; }
      // 处理Key-Value和ID-STATUS的情况
      else {
          if (this.obj["KEY"] && this.obj["VALUE"] && this.obj["KEY"] instanceof Array && this.obj["VALUE"] instanceof Array && this.obj["KEY"].length === this.obj["VALUE"].length) {
              const newObj: { [key: string]: any } = {};
              this.obj["KEY"].forEach((key: string, index: number) => {
                  const value = this.obj["VALUE"][index];
                  newObj[key] = value;
              });
              return newObj;
          }
          if (this.obj["ID"] && this.obj["STATUS"] && this.obj["ID"] instanceof Array && this.obj["STATUS"] instanceof Array && this.obj["ID"].length === this.obj["STATUS"].length) {
              return this.obj["STATUS"];
          }
          return this.obj;
      }
  }
}

class XmlReader {
  public data: string;
  public position: number = 0;
  constructor(data: string) {
      this.data = data;
  }
  getTag(): [string, string] {
      // 说明是标签
      const tagstart = this.data.indexOf('<', this.position);
      const tagend = this.data.indexOf('>', this.position);
      if (tagend === -1) {
          return [null, null];
      }
      const tagName = this.data.slice(tagstart + 1, tagend);
      const tagContent = tagstart !== this.position ? this.data.slice(this.position, tagstart) : null;
      this.position = tagend + 1;
      return [tagName, tagContent];
  }
}

export function Xml2json(data: string) {
  const root = new Node();
  const nodeStack: Node[] = [];
  let currentNode: Node = root;
  const reader = new XmlReader(data);
  while (true) {
      let [tagname, value] = reader.getTag();
      if (tagname === null) break;
      if (tagname.startsWith("?xml")) continue;
      if (!tagname.includes("/")) {
          // 这是一个起始标签
          const node = new Node(tagname);
          nodeStack.push(currentNode);
          currentNode = node;
      } else {
          // 这是一个结束标签
          currentNode.value = value;
          const parentNode = nodeStack.pop();
          parentNode.addToContent(currentNode);
          currentNode = parentNode;
      }
  }
  return root.obj;
}