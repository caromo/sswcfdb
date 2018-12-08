defmodule SswcfdbWeb.FlowerController do
    use SswcfdbWeb, :controller
  

    def index(conn, _params) do
        render(conn, "index.html")
    end

    def show(conn, _params) do
      {:ok, db} = Sqlitex.open("flowers.db")
      json(conn, List.last( Tuple.to_list(Sqlitex.query(db, "SELECT * FROM FLOWERS", into: %{}) ) ) )
    end
  end
  