获得一个人的所有following的信息（递归maxdepth层）

following_list([username] , callback)
Attention! username需要是一个List
只递归两层：username关注的人，以及关注的人关注的人
{
	callback(Dict{'username' : distance})
}

获得一个人的所有仓库列表

repo_list(username , callback)
{
	callback(Array[fullname])
}

获得一个仓库的readme信息

get_readme(fullname , callback)
{
	callback(text)
}

获得一个仓库的stars数量

get_stars(fullname , callback)
{
	callback(number_of_stars)
}
