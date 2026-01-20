import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";


export default async function Home() {

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore)

    const {data: todos} = await supabase.from('games').select();
console.log(todos);
    return (
        <ul>
            {todos?.map((todo) => (
                <li key={todo.id}>{todo?.todo}</li>
            ))}
        </ul>
  );
}

