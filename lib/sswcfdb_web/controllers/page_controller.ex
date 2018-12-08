defmodule SswcfdbWeb.PageController do
  use SswcfdbWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
