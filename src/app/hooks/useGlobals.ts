
import { Member } from "../../libs/types/member";
import { useContext, createContext} from "react";

interface GlobalInterFace {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
};

export const GlobalContext = createContext<GlobalInterFace | undefined> (
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if(context === undefined) throw new Error("useGlobals withit Provider");
    return context
}