import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;

public class Server extends EquationsSolverImpl {
    public Server() {
    }

    public static void main(String[] args) {
        try {
            EquationsSolverImpl obj = new EquationsSolverImpl();
            EquationsSolver stub = (EquationsSolver) UnicastRemoteObject.exportObject(obj, 0);
            Registry registry = LocateRegistry.getRegistry();
            registry.bind("EquationsSolver", stub);
            System.err.println("Server ready");
        } catch (Exception e) {
            System.err.println("Server exception" + e.toString());
            e.printStackTrace();
        }
    }
}
