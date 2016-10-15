获得一个人的所有following的信息（递归maxdepth层）

following_list(username , maxdepth , callback)
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
