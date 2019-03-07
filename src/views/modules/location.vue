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
			:data="vehicle"
			show-checkbox
			default-expand-all
			node-key="id"
			ref="tree"
			highlight-current
			accordion
			:props="defaultProps">
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
		<!-- 地图 -->
		<div class="container">
			<div class="container-top">
				<el-row type="flex" justify="end">
					<el-col :span="3"><div class="grid-content bg-purple"><img src="../../assets/img/location/u89.png" alt="">百度地图</div></el-col>
					<el-col :span="3"><div class="grid-content bg-purple-light"><img src="../../assets/img/location/u87.png" alt="">全屏地图</div></el-col>
				</el-row>
			</div>
			<div class="container-content">
				<!-- 主地图 -->
				<div id="container-map"></div>
			</div>
			<div class="container-footer">
				<div class="Monitor-from">
				<!-- tabs标签页 -->
					<div class='arrow'>
						<a><img src="../../assets/img/location/u339.png" alt=""></a>
						<a><img src="../../assets/img/location/u341.png" alt=""></a>
					</div>
					<el-tabs v-model="activeName" @tab-click="handleClick" type='card'>
						<el-tab-pane label="GPS监控" name="first">	 
							<!-- 右下监控报警表格 -->
							<!-- 第一个 -->
							<el-table
							:data="tableDataFirst"
							border
							style="width: 100%">
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
								width="250%">
							</el-table-column>
							<el-table-column
								prop="speed"
								label="速度"
								width="100%">
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
							style="width: 100%">
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
							style="width: 100%">
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
  },
  mounted () {
    this.getMap()
  },
  data () {
    return {
      search: '',
      checkList: [],
// tabs标签页
      activeName: 'first',
      vehicle: [{
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
  methods: {
// 地图组件
    getMap () {
      const map = new window.BMap.Map('container-map')          // 创建地图实例
      const point = new window.BMap.Point(116.404, 39.915)  // 创建点坐标
      map.centerAndZoom(point, 15)                 // 初始化地图，设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true)     // 开启鼠标滚轮缩放
      var opts = {type: window.BMAP_NAVIGATION_CONTROL_ZOOM}
      map.addControl(new window.BMap.NavigationControl(opts))
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
	background: #ECEEF2;
	padding-left: 265px;
	
}
.container #container-map{
	height: 100%;
	width: 100%;
	margin-top:10px;
	/* margin-left: 10px; */
	border: 2px solid #9A9A9A;
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
	height: 190px;
}
</style>