// 登录
export function login () {
  return {
    // isOpen: false,
    url: '/user/login',
    type: 'post',
    data: {
      "msg": "操作成功",
      "code": "1014",
      "data": {
        "userInfo": {
          "credentials": "865c023753be4b889020d9286eac7290",
          "params": {},
          "principal": "pc@163.com",
          "rememberMe": false,
          "signature": "865c023753be4b889020d9286eac7290",
          "username": "pc@163.com"
        },
        "roles": [{
          "createTime": 1544680867000,
          "id": 1,
          "roleName": "超级管理员",
          "sysMenus": [{
            "fid": 0,
            "id": 1,
            "menuName": "用户管理",
            "sort": "1",
            "type": 0
          }, {
            "fid": 1,
            "id": 2,
            "menuName": "添加用户",
            "permission": "user:add",
            "sort": "2",
            "type": 0,
            "url": "/user/add"
          }]
        }],
        "menus": [
        {
          "child": [],
          "hasChildNode": true,
          "id": 11,
          "nodeName": "用户信息",
          "obj": {
            "fid": 0,
            'icon': 'admin',
            "id": 11,
            "menuName": "实时定位",
            "url": "location",
            "sort": "1",
            "type": 0
          },
          "pid": 0
        },
        {
          "child": [
            {
              "child": [],
              "hasChildNode": false,
              "id": 2,
              "nodeName": "添加用户",
              "obj": {
                "fid": 1,
                "id": 2,
                "menuName": "添加用户",
                "permission": "user:add",
                "sort": "2",
                "type": 0,
                'icon': 'admin',
                "url": "sys/role"
              },
              "pid": 1
            },
            {
              "child": [],
              "hasChildNode": false,
              "id": 10,
              "nodeName": "ffff",
              "obj": {
                "fid": 1,
                "id": 10,
                "menuName": "ssss",
                "permission": "user:add",
                "sort": "2",
                "type": 0,
                'icon': 'job',
                "url": "job/schedule"
              },
              "pid": 1
            }
          ],
          "hasChildNode": true,
          "id": 1,
          "nodeName": "用户管理",
          "obj": {
            "fid": 0,
            'icon': 'admin',
            "id": 1,
            "menuName": "用户管理",
            "sort": "1",
            "type": 0
          },
          "pid": 0
        },
        {
          "child": [
          {
            "child": [],
            "hasChildNode": false,
            "id": 3,
            "nodeName": "用户",
            "obj": {
              "fid": 1,
              "id": 3,
              "menuName": "用户",
              "permission": "user:add",
              "sort": "2",
              "type": 0,
              'icon': 'admin',
              "url": "sys/user"
            },
            "pid": 1
          }
          ],
          "hasChildNode": true,
          "id": 4,
          "nodeName": "用户ff",
          "obj": {
            "fid": 0,
            'icon': 'admin',
            "id": 4,
            "menuName": "用554",
            "sort": "1",
            "type": 0
          },
          "pid": 0
        },
        {
          "child": [],
          "hasChildNode": true,
          "id": 5,
          "nodeName": "用户信息",
          "obj": {
            "fid": 0,
            'icon': 'admin',
            "id": 5,
            "menuName": "用户信息",
            "url": "user",
            "sort": "1",
            "type": 0
          },
          "pid": 0
        },
        ],
        "permissons": [{
          "fid": 0,
          "id": 1,
          "menuName": "用户管理",
          "sort": "1",
          "type": 0
        }, {
          "fid": 1,
          "id": 2,
          "menuName": "添加用户",
          "permission": "user:add",
          "sort": "2",
          "type": 0,
          "url": "/user/add"
        }]
      }
    }
  }
}