import { Canvas } from "./_components/canvas"
import {Room} from "@/components/room"
import { Loading } from "./_components/loading";

export default async function BoardPage({ params }: { params: { boardId: string } }) {
    const { boardId } = params;

    return (
        <Room roomId={boardId} fallback={<Loading/>}>
            <Canvas boardId={boardId} />
        </Room>
    );
}
