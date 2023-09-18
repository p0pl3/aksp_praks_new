import java.rmi.RemoteException;

public class EquationsSolverImpl implements EquationsSolver {
    public static final double EPS = 1e-10;

    @Override
    public Answer solve(double a, double b, double c) throws RemoteException {
        if (Math.abs(a) < EPS) {
            if (Math.abs(b) < EPS) {
                if (Math.abs(c) < EPS)
                    return new Answer("Infinite solutions");
                return new Answer("No solution");
            }
            return new Answer("x = " + -c / b);
        }
        // Дискриминант
        double D = Math.pow(b, 2) - 4 * a * c;
        if (Math.abs(D) < EPS)
            return new Answer("x = " + -b / (2 * a));
        if (D < 0)
            return new Answer("No solution");
        double d = Math.sqrt(D);
        return new Answer("x1 = " + (-b - d) / (2 * a) + "\nx2 = " + (-b + d) / (2 * a));
    }
}
