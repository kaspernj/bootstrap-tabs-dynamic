$.fn.addBSTab = function(id, title, content){
  ele_with_id = $("#" + id)
  if (ele_with_id.length > 0){
    throw "An element with that ID already exist: '" + id + "'."
  }
  
  ul = $(this)
  container = $($(".tab-content", ul.parent())[0])
  
  li = $("<li />", {
    "id": id + "-li",
    "data": {
      "toggle": "tab"
    }
  })
  
  a = $("<a />", {
    "href": "#" + id,
    "text": title
  })
  a.click(function(){
    // setTimeout-hack to make the event work (or the element wont look like its active, it will actually be active though) - kj
    a_ele = $(this)
    setTimeout(function(){
      a_ele.tab("show")
    }, 25)
  })
  
  li.append(a)
  
  div = $("<div />", {
    "id": id,
    "class": ["tab-pane"],
    "css": {
      "display": "none"
    }
  })
  
  if (typeof content == "string"){
    div.html(content)
  }else{
    div.append(content)
  }
  
  ul.append(li)
  container.append(div)
  
  a.tab("show")
  div.fadeIn("fast")
  
  return {
    "content": div,
    "a": a
  }
}

$.fn.getBSTabByID = function(id){
  a = $("a[href=#" + id + "]")
  if (a.length <= 0){
    throw "Could not find a tab with that ID: '" + id + "'."  
  }
  
  li = a.parent()
  
  return li
}

$.fn.renameBSTab = function(title){
  a = $("a", this)
  if (a.length <= 0){
    throw "No a element. Was that really a tab?"  
  }
  
  a.text(title)
}

$.fn.removeBSTab = function(){
  a = $("a", this)
  if (a.length <= 0){
    throw "No a-element could be found. Was that really a tab?"  
  }
  
  content = $(a.attr("href"))
  if (content.length <= 0){
    throw "The content container could not be found."
  }
  
  content.slideUp("fast", function(){
    $(this).remove()
  })
  
  a.fadeOut("fast")
  $(this).remove()
}

$.fn.currentBSTab = function(){
  pane = $(this).parents(".tab-pane")
  if (pane.length <= 0){
    throw "No parent tab was found. Are you sure there is one?"
  }
  pane = $(pane[0])
  
  id = pane.attr("id")
  if (!id){
    throw "The pane found did not have an ID: '" + pane.html() + "'."
  }
  
  a = $("a[href=#" + id + "]")
  
  if (a.length <= 0){
    throw "The link from the pane could not be found. Did you make an invalid structure? The ID should have been: '" + id + "'."
  }
  
  li = a.parent()
  if (li.length <= 0){
    throw "The link-element did not have a parent: " + a.html()
  }
  
  return li
}

$.fn.currentBSTabContent = function(){
  pane = $(this).parents(".tab-pane")
  if (pane.length <= 0){
    throw "No parent tab was found. Are you sure there is one?"
  }
  pane = $(pane[0])
  
  return pane
}

$.fn.currentBSTabID = function(){
  return $(this).currentBSTab().find("a").attr("href").substring(1, 999)
}