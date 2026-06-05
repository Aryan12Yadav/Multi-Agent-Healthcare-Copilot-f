class TrendService:

    def calculate(self, values):

        if len(values) < 2:

            return "insufficient_data"

        first = values[0]

        last = values[-1]

        if last > first:

            return "increased"

        if last < first:

            return "decreased"

        return "stable"