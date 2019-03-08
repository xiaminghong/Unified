<template>
	<div class="main-content__wrapper">
		<aside class="main-content__sidebar">
			<div class="main-content__tree">
				<div class="tree-search">
					<el-input v-model="search" size="small" placeholder="请输入车牌号" class="input-with-select">
				    <el-button slot="append" icon="el-icon-search"></el-button>
				  </el-input>
				</div>
				<!-- 树状多选框 -->
			<el-tree
			:data="vehicles"
			show-checkbox
			default-expand-all
			node-key="id"
			ref="tree"
			accordion
			:props="defaultProps"
			@check='getCheckedKeys'
		>
		</el-tree>
			
			</div>
			<div class="main-content__info">
				<!-- 左表单 -->
				<div class="status">
					<ul>
						<li>状态</li>
						<li>云台</li>
						<li>色彩</li>
						<li>语言</li>
						<li><img src="../../assets/img/location/u73.png"></li>
					</ul>
				</div>
				<div class='state-line'>
						<ul>
							<li>名称<p>沪A05A58</p></li>
							<li>终端ID<p>2356548864524</p></li>
							<li>所属组织<p>shly</p></li>
							<li>状态<p>正常</p></li>
							<li>GPS时间<p>12:00 - 02:00</p></li>
							<li>位置<p>上海市青浦区</p></li>
						</ul>
				</div>
			</div>
		</aside>
		<!-- 地图右容器 -->
		<div class="container">
			<div class="container-top">
				<el-row type="flex" justify="end">
					<el-col :span="3"><div class="grid-content bg-purple"><img src="../../assets/img/location/u89.png" alt="">百度地图</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light"><img src="../../assets/img/location/u87.png" alt="">全屏地图</div></el-col>
				</el-row>
			</div>
			<div class="container-content">
				<div class="enclosure">
						<div class="myMap">我的地图</div>
						<div class="myMap" @click="isShowColumn">电子围栏</div>
					</div>
			<!-- ====================== -->
			<!-- 是否显示添加电子围栏 -->
			<div class='addForm' v-show="false">
				<div class="addForm-header">添加电子围栏</div>
				<div class='classTable'>
					<table border="1">
						<tr>
							<th>名称</th>
							<th><input type="text"></th>
						</tr>
						<tr>
							<th>区域</th>
							<th>
								<input type="radio">自定义区域
								<input type="radio">行政区域
							</th>
						</tr>
						<tr>
							<th>区域名称</th>
							<th>
								<select name="" id="">
									<option value="包车1">包车1</option>
									<option value="包车2">包车2</option>
									<option value="包车3">包车3</option>
									<option value="包车4">包车4</option>
								</select>
							</th>
						</tr>
						<tr>
							<th>状态</th>
							<th>
								<select name="" id="">
									<option value="禁入">禁出</option>
									<option value="禁出">禁入</option>
								</select>
							</th>
						</tr>
						<tr>
							<th>录像时长</th>
							<th><input type="text"></th>
						</tr>
						<tr>
							<th>摄像头
								<input type="checkbox">全选
							</th>
							<th>
								<input type="checkbox">摄像头
								<input type="checkbox">摄像头
								<input type="checkbox">摄像头
								<input type="checkbox">摄像头
							</th>
						</tr>
						<tr>
							<th>报警语音</th>
							<th>
								<input type="text">
							</th>
						</tr>
					</table>
					<button>保存</button>
					<button>关闭</button>
				</div>
			</div>
		<!-- ================================== -->
			<!-- 是否显示电子围栏 -->
			<div  v-show="false">
				<div class="clickHide">隐藏</div>
				<div class="frame">
					<!-- 搜索名称 -->
					<el-row>
				  <el-col :span="10"><div class="grid-content bg-purple">
						<el-input v-model="nameText" placeholder="名称"></el-input>
					</div></el-col>
					<el-col :span="4"><div class="grid-content bg-purple-light">
						<el-button  icon="el-icon-search"></el-button>
					</div></el-col>
					<el-col :span="8"><div class="grid-content bg-purple">
						<el-button type="primary" plain>添加</el-button>	
					</div></el-col>
					<!-- 表单 -->
					 <el-table
						:data="addData"
						border
						style="height:190px width: 100%">
						<el-table-column
							type="selection"
							width="45">
						</el-table-column>
						<el-table-column
							prop="name"
							label="操作"
							width="70">
						</el-table-column>
						<el-table-column
							prop="address"
							label="序号"
							width="50">
						</el-table-column>
						<el-table-column
							prop="address"
							label="名称"
							width="50">
						</el-table-column>
						<el-table-column
							prop="address"
							label="所属组织"
							width="100">
						</el-table-column>
						<el-table-column
							prop="address"
							label="类型"
							width="50">
						</el-table-column>
					</el-table>
				</el-row>
				<!-- 每页数记录条 -->
				<el-row>
				<el-col :span="3"><div class="grid-content bg-purple">单页数目</div></el-col>
				<el-col :span="3"><div class="grid-content bg-purple-light">
					<select name="" id="">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						</select>	
					
				</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple">
					<i class='el-icon-d-arrow-left'></i>	
					<i class='el-icon-arrow-left'></i>	
					</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light">
						第1页
						</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple">共一页</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light">
						<i class='el-icon-arrow-right'></i>	
						<i class='el-icon-d-arrow-right'></i>	
						
					</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light">
						<i class='el-icon-refresh'></i>	
						</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light">没有记录</div></el-col>
				</el-row>
	
				</div>
			</div>

				<!-- 主地图 -->
				<div id="container-map">
				</div>
			</div>
			<div class="container-footer">
				<div class="Monitor-from">
				<!-- tabs标签页 -->
					<div class='arrow'>
						<a><img src="../../assets/img/location/u339.png" alt=""></a>
						<a><img src="../../assets/img/location/u341.png" alt=""></a>
					</div>
					<el-tabs v-model="activeName" @tab-click="handleClick" type='card'>
						<el-tab-pane label="GPS监控" name="first" >	 
							<!-- 右下监控报警表格 -->
							<!-- 第一个 -->
							<el-table
							:data="tableDataFirst"
							border
							
							style="height:190px width:100%">
							<el-table-column
								prop="vehicle"
								label="车牌号"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="date"
								label="GPS时间"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="address"
								label="位置"
								width="200%"
								>
							</el-table-column>
							<el-table-column
								prop="speed"
								label="速度"
								width="100%"
								>
							</el-table-column>
							<el-table-column
								prop="police"
								label="报警"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="state"
								label="状态"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="mileage"
								label="里程"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="210km"
								label="其他信息"
								width="150%">
							</el-table-column>
							<el-table-column
								prop=""
								label=""
								width="200%">
							</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="报警信息" name="second">
							<!-- 第二个 -->
							<el-table
							:data="tableDataSecond"
							border
							style="height:190px width:100%">
							<el-table-column
								prop="vehicle"
								label="操作"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="date"
								label="所属公司"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="address"
								label="车牌号"
								width="250%">
							</el-table-column>
							<el-table-column
								prop="speed"
								label="报警数目"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="police"
								label="最新报警"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="state"
								label="开始时间"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="mileage"
								label="结束时间"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="210km"
								label="报警信息"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="startPosition"
								label="开始位置"
								width="200%">
							</el-table-column>
							<el-table-column
								prop="endPosition"
								label="结束位置"
								width="200%">
							</el-table-column>
							</el-table>
						</el-tab-pane>
						<el-tab-pane label="媒体查询" name="third">
							<!-- 第三个 -->
							<el-table
							:data="tableDataThird"
							border
							style="height:190px width:100%">
							<el-table-column
								prop="vehicle"
								label="操作"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="date"
								label="车牌号"
								width="150%">
							</el-table-column>
							<el-table-column
								prop="address"
								label="文件类型"
								width="250%">
							</el-table-column>
							<el-table-column
								prop="speed"
								label="通道"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="police"
								label="接受时间"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="state"
								label="文件时间"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="mileage"
								label="状态"
								width="100%">
							</el-table-column>
							<el-table-column
								prop="210km"
								label="报警类型"
								width="150%">
							</el-table-column>
							<el-table-column
								prop=""
								label="大小(mb)"
								width="100%">
							</el-table-column>
							<el-table-column
								prop=""
								label="文件位置"
								width="100%">
							</el-table-column>
							<el-table-column
								prop=""
								label="文件路径"
								width="100%">
							</el-table-column>
							</el-table>
						</el-tab-pane>
					</el-tabs>
				</div>
			
			</div>

		</div>
	</div>
</template>

<script>
export default {
  created () {
    this.map = null
// this.locationMarker = null
    this.point = null
    this.marker = null
  },
  mounted () {
    this.getMap()
  },
  data () {
    return {
      isShow: 'false',
// 单选框
      radio: '',
// 搜索内容
      search: '',
      checkList: [],
// 添加电子围栏内容
      labelPosition: 'right',
      formLabelAlign: {
        name: ''
      },
// 输入名称内容
      nameText: '',
      addData: [{
        date: '2016',
        name: '王小虎',
        address: '上海市'
      }],
// ======================
      vehicles: [{
        id: 1,
        label: 'shly',
        children: [{
          id: 2,
          label: '沪A05A58'
        }, {
          id: 3,
          label: '沪A05A58 B'
        }, {
          id: 4,
          label: '沪A05A58 C'
        }, {
          id: 5,
          label: '沪A05A58 D'
        }, {
          id: 6,
          label: '沪A05A58 E'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
// tabs标签页
      activeName: 'first',
// 右下表格数据一
      tableDataFirst: [{
        vehicle: '沪A5927',
        date: '02:54:03 -04:26:06',
        address: '江苏省扬州市邗江区扬州金威机械有',
        speed: '54',
        police: '离线',
        state: '正常',
        mileage: '210km',
        msg: ''
      },
      {
        vehicle: '沪A5927',
        date: '02:54:03 -04:26:06',
        address: '江苏省扬州市邗江区扬州金威机械有',
        speed: '54',
        police: '离线',
        state: '正常',
        mileage: '210km',
        msg: ''
      }],
// 右下表格数据二
      tableDataSecond: [{
        vehicle: '沪A5927',
        date: '上海市华胜捷物流有限公司',
        address: '沪A5927',
        speed: '3',
        police: '超速报警',
        state: '2018年12月10日12:30:09',
        mileage: '2018年12月10日12:30:09',
        msg: '',
        startPosition: '上海市松江区车墩',
        endPosition: '上海市青浦区诸光路20号'
      }],
// 右下表格数据三
      tableDataThird: [{
        vehicle: '',
        date: '',
        address: '',
        speed: '',
        police: '',
        state: '',
        mileage: '',
        msg: ''
      }]
    }
  },
// 方法
  methods: {
// 是否显示电子围栏
    isShowColumn () {
      console.log(11)
      this.isShow = true
    },
// 获取到树数据
    getCheckedKeys () {
      console.log(this.$refs.tree.getCheckedKeys())
      if (this.$refs.tree.getCheckedKeys().length !== 0) {
        // 创建小狐狸
        var pt = new window.BMap.Point(121.487, 31.2349)
        var myIcon = new window.BMap.Icon('http://lbsyun.baidu.com/jsdemo/img/fox.gif', new this.BMap.Size(300, 157))
        this.marker = new window.BMap.Marker(pt, {icon: myIcon})  // 创建标注
        this.map.addOverlay(this.marker)
        // console.log(111)
      } else {
        this.map.removeOverlay(this.marker)
      }
    },
// 地图组件
    getMap () {
      this.map = new window.BMap.Map('container-map')          // 创建地图实例
      this.point = new window.BMap.Point(121.487, 31.2349)  // 创建点坐标
      // map.centerAndZoom('上海', 15)
      this.map.centerAndZoom(this.point, 15)                 // 初始化地图，设置中心点坐标和地图级别
      this.map.enableScrollWheelZoom(true)     // 开启鼠标滚轮缩放
      let opts = {type: window.BMAP_NAVIGATION_CONTROL_ZOOM}     // 点击放大所需按钮
      this.map.addControl(new window.BMap.NavigationControl(opts))
    },
// tabs标签页
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>

/* 单选框 */
.main-content__sidebar{
	width: 265px;
}
.el-checkbox{
	width: 100%;
	color: black;
}
/* 车牌查询 */
.el-tree{
	width: 265px;
	height: 619px;
	background: #fff;
}
.el-tree{
	padding-left: 10px;
	padding-top:10px;
}

.main-content__tree{
	height: auto;
}
.main-content__info{
	width: 265px;
	/* height: 153px; */
}
/* 左表单 */
.status{
	width: 265px;
	height: 26px;
	line-height: 26px;
	background: #F2F2F2;
}
 ul{
	list-style: none;
	padding: 0;

}
.status ul li{
	float: left;
	width: 20%;
	font-size: 13px;
	font-weight: 700;
	text-align: center;
}
.state-line{
	width: 265px;
	height: 153px;
}
.state-line li{
	float: left;
	width: 100%;
	height: 25px;
	font-size: 16px;
	line-height: 25px;
}
.state-line li:active{
	background: blue;
}
.state-line li p{
	/* float: left; */
	display: inline;
	padding-left: 80px;
}
.status ul li:hover{
	color: blue;
}

/* 百度地图 */
.container{
	width: 100%;
	padding-left: 10px;
}
.container .container-top{
	width: 100%;
	height: 43px;
	line-height: 43px;
	background: #F2F2F2;
	box-shadow: 0 3px 0 0 #f9f9f9;
	padding-left: 265px;
	text-align: center;
}
/* 地图栏 */
.container .container-content{
	height: 586px;
	width: 100%;
	padding-left: 265px;
	/* position: relative; */
	
}

.container #container-map{
	height: 100%;
	width: 100%;
	margin-top:10px;
	/* margin-left: 10px; */
	border: 2px solid #9A9A9A;
	
}
.container .enclosure{
	position: absolute;
	left: 70%;
	top: 13%;
	/* width: 100px;
	height: 50px; */
	background: #fff;

	z-index: 999;
}
/* 隐藏按钮 */
.container .clickHide{
	position: absolute;
	left: 75%;
	top: 11%;
	border: 1px solid #000;
	background: #199ED8;
	z-index: 999;
	padding: 2px 5px;
}
.container .enclosure .myMap{
	font-size: 14px;
	padding: 1px;
	border: 1px solid #000;
	cursor: pointer;
}

/* 是否显示添加电子围栏 */
.container .addForm{
	width: 388px;
	height: 435px;
	background: #fff;
	position: absolute;
	left: 36%;
	top: 15%;
	z-index: 999;
	border-radius: 20px;
	border: 1px solid #000;
}
.container .frame{
	width: 368px;
	height: 239px;
	background: #fff;
	position: absolute;
	left: 75%;
	top: 15%;
	z-index: 999;
}
.container .addForm .addForm-header{
	height: 40px;
	line-height: 40px;
	width: 100%;
	text-align: center;
	background: #52A4DB;
	border-radius: 20px 20px 0 0;
}

/* 右底部表单 */
.container-footer{
	padding-left: 265px;

}
.container-footer .Monitor-from{
	width: 100%;
	height: 44px;
	/* line-height: 44px; */
	background: #F2F2F2;
	border: 1px solid #000;
	position: relative;
}
.container-footer .Monitor-from .arrow {
	position: absolute;
	top:10px;
	right: 30px;
}
.container-footer .Monitor-from .arrow a:nth-child(1){
	margin-right: 20px;
}
.el-table--border{
	height: 180px;
}
.clickHide{
	cursor: pointer;
}

/* 添加电子围栏框 */
.classTable{
	padding: 15px;
}
.classTable table{
	border: 1px solid #000;
	width: 100%;
	height: 100%;
	border-collapse:collapse;
}
.classTable button{
	padding: 2px 20px;
	margin-left: 60px;
	margin-top: 20px;
}

.classTable table tr{
	height: 30px;
}
.classTable table tr th:nth-child(odd){
	width: 100px;
	text-align: right;
	padding-right: 10px;
}
.classTable table tr th:nth-child(even){
	padding-left: 10px;
	text-align: left;
}
.classTable table tr:nth-child(6){
	height: 100px;
}
.classTable table tr:nth-child(7){
	height: 60px;
}
.classTable table tr:nth-child(7) input{
	height: 40px;
	width: 200px;
}

</style>