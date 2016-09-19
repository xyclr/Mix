var bookLoginModule = angular.module("BookLoginModule", []);

bookLoginModule.controller('LoginCtrl', function($scope, $http,$state, $stateParams) {
    $scope.userInfo = {
        user :'John Doe',
        password :'john.doe@gmail.com'
    }
    $scope.login = function(){
        //登陆服务端校验
        //$location.path('booklist({bookType:0})');
        //console.info($location.path());
        $state.go('booklist', {bookType:0});
        //$state.href("booklist.booktype", { bookType:0 })
    }
})

/**
 * 这里是书籍列表模块
 * @type {[type]}
 */
var bookListModule = angular.module("BookListModule", []);

bookListModule.controller('BookListCtrl', function($scope, $rootScope, $http, $state, $stateParams) {
    $scope.bookTypes = [{
        "name" : "全部",
        "id" : 0
    },{
        "name" : "计算机",
        "id" : 1
    },{
        "name" : "金融",
        "id" : 2
    },{
        "name" : "哲学",
        "id" : 3
    },{
        "name" : "高端办公",
        "id" : 4
    }];
    $scope.bookType = $stateParams.bookType;
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.books = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //test baidu
    $http({
        url:  'http://www.baidu.com',
        type: 'get'
    });

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get($rootScope.config.interFaceUrl.getBookList)
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http({
                    url:  $rootScope.config.interFaceUrl.getBookList,
                    type: 'get',
                    params : {type :$stateParams.bookType}
                })
                    .success(function(largeLoad) {
                        var largeLoad = largeLoad.list;
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 400);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
});


/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", ['me-lazyload']);
bookDetailModule.controller('BookDetailCtrl', function($scope,$rootScope, $http, $state, $stateParams) {
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    var url = 'http://www.gravatar.com/avatar/6ca6c6611136a3e05ce30d872da1b551.jpg?s=100';
    var ary = [];
    for(var i = 0; i < 40; i++){
        ary.push(url + '&t=' + i + (+new Date()))
    }

    $http({
        url:  $rootScope.config.interFaceUrl.getBookDetail,
        type: 'get',
        params : {bookId :$stateParams.bookId}
    }).success(function(data) {
            data = data.detail;
            $scope.bookId = data.bookId;
            $scope.name = data.name;
            $scope.author = data.author;
            $scope.pubTime = data.pubTime;
            $scope.price = data.price;
            $scope.thumb = data.thumb;
            $scope.content = data.content;
            $scope.images = ary;
        });
});
