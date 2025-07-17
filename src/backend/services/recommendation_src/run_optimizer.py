import os
import json
import argparse
import random
import numpy as np
import pandas as pd
import networkx as nx
from dotenv import load_dotenv
from supabase import create_client
import weight_optimizer

load_dotenv()