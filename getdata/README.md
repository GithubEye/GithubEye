获得一个人的所有following的信息（递归maxdepth层）

following_list(username , callback , extra_res)

*extra_res是在页面post的回调函数所需渲染页面的参数，如果是纯命令行运行则可赋值为null*

只递归两层：username关注的人，以及关注的人关注的人
{
	callback([usernames] , extra_res)
}

获得一个人的所有仓库列表

repo_list(username , callback , extra_res)
{
	callback(Array[fullname] , extra_res)
}

获得一个仓库的readme信息

get_readme(fullname , callback , extra_res)
{
	callback(text , extra_res)
}

获得一个仓库的stars数量

get_stars(fullname , callback , extra_res)
{
	callback(number_of_stars , extra_res)
}
