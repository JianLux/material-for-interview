## 1-线型Line styles
1. lineWidth = value,设置线条宽度
2. lineCap = type,设置线条末端样式
3. lineJoin = type,设定线条与线条间结合处的样式
4. miterLimit = value,限制当两条线相接时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。
5. getLineDash(),返回一个包含当前虚线样式，长度为非负偶数的数组
6. setLineDash(),设置当前虚线样式
7. lineDashOffset = value,设置虚线的样式的起始偏移量