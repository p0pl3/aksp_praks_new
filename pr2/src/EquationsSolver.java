import java.rmi.Remote;
import java.rmi.RemoteException;

public interface EquationsSolver extends Remote {
    Answer solve(double a, double b, double c) throws RemoteException;
}
