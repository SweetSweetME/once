sort 方法在为number数组排序时 是按照ASCII码排序的 即按照字符的大小 1 12 13 3 4 45 5 默认这样增序
js 提供了一种为数字排序的方法
```
var arr = [1, 4, 7, 2, 0, 8, 12, 4];
 function mySort(a, b){
        if( a > b ){
            return 1;
        }else if( a < b ){
            return -1;
        }else{
            return 0;
        }
    }
arr.sort(mySort);
arr.reverse();
```
自己写一个函数 传入两个参数 比较 参数大小返回 1 -1 0 来判断大小 换位置
上面这种情况返回的 1 -1 最后是降序
反过来即是增序
